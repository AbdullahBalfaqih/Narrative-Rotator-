import os
import requests
import json
from src.utils.logger import logger

class SentimentAnalyzer:
    def __init__(self):
        self.openrouter_key = os.getenv("OPENROUTER_API_KEY")
        self.openrouter_model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
        logger.info(f"Sentiment Analyzer initialized (model: {self.openrouter_model}).")

    def analyze_text_sentiment(self, text_list):
        """
        Uses OpenRouter LLM to analyze sentiment from headlines/texts.
        Returns a score from -1.0 (very negative) to 1.0 (very positive).
        Falls back to keyword heuristic if no API key is set.
        """
        if not text_list:
            return 0.0

        if not self.openrouter_key:
            return self._heuristic_fallback(text_list)

        prompt = (
            "You are a crypto market sentiment analyst. "
            "Analyze the following crypto news headlines and return ONLY a JSON object "
            "with a single key 'score' (float from -1.0 to 1.0) representing overall sentiment. "
            "Negative = bearish, positive = bullish.\n\nHeadlines:\n"
            + "\n".join(f"- {t}" for t in text_list)
        )

        try:
            resp = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openrouter_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.openrouter_model,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.1,
                    "max_tokens": 100,
                },
                timeout=15,
            )
            if resp.ok:
                content = resp.json()["choices"][0]["message"]["content"]
                # Extract JSON from response
                import re
                match = re.search(r'\{[^}]+\}', content)
                if match:
                    data = json.loads(match.group())
                    score = float(data.get("score", 0))
                    logger.info(f"LLM sentiment score: {score}")
                    return max(-1.0, min(1.0, score))
        except Exception as e:
            logger.warning(f"OpenRouter sentiment call failed: {e}")

        return self._heuristic_fallback(text_list)

    def _heuristic_fallback(self, text_list):
        """Keyword-based fallback when LLM is unavailable"""
        positive_keywords = ["surge", "bullish", "adopt", "growth", "launch", "partnership", "breakout", "rally", "upgrade", "pump"]
        negative_keywords = ["crash", "bearish", "hack", "exploit", "fud", "ban", "dump", "investigation", "regulation", "drop"]

        total_score = 0.0
        for text in text_list:
            score = 0.0
            words = text.lower().split()
            for word in words:
                if any(pos in word for pos in positive_keywords):
                    score += 0.25
                if any(neg in word for neg in negative_keywords):
                    score -= 0.25
            total_score += max(-1.0, min(1.0, score))

        return total_score / len(text_list)

    def get_sector_sentiment_index(self, raw_sentiment_data):
        """Calculates a normalized score (0 to 100) based on raw metrics"""
        positive_ratio = raw_sentiment_data.get("news_positive_ratio", 0.5)
        social_sentiment = raw_sentiment_data.get("social_positive_sentiment", 0.5)
        kol_index = raw_sentiment_data.get("kol_sentiment_index", 0.5)

        score = (positive_ratio * 0.40) + (social_sentiment * 0.35) + (kol_index * 0.25)
        return round(score * 100, 2)
