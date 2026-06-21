import time
import json
import urllib.request
import urllib.error
import sys
import os

WEBHOOK_SITE_UUID = "6bc296a6-e37d-4071-932e-8092dd0e55ef"
LOCAL_AGENT_URL = "http://127.0.0.1:8000/api/agent-webhook"
POLL_INTERVAL = 3
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "relay.log")

def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    try:
        with open(LOG_FILE, "a") as f:
            f.write(line + "\n")
    except:
        pass

def http_get(url):
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode())

def http_post(url, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=5) as resp:
        return resp.read().decode()

def http_delete(url):
    req = urllib.request.Request(url, method="DELETE")
    with urllib.request.urlopen(req, timeout=5):
        pass

def poll():
    log(f"Webhook Relay started")
    log(f"Public URL: https://webhook.site/{WEBHOOK_SITE_UUID}")
    log(f"Forwarding to: {LOCAL_AGENT_URL}")
    seen = set()
    while True:
        try:
            data = http_get(f"https://webhook.site/token/{WEBHOOK_SITE_UUID}/requests")
            for req in data.get("data", []):
                rid = req.get("uuid", "")
                if rid in seen:
                    continue
                seen.add(rid)
                content_raw = req.get("content", "{}")
                ip = req.get("ip", "?")
                country = req.get("country", "?")
                log(f"Message from {ip} ({country})")
                try:
                    payload = json.loads(content_raw) if content_raw else {}
                    resp_text = http_post(LOCAL_AGENT_URL, payload)
                    log(f"Forwarded OK: {resp_text[:100]}")
                except Exception as e:
                    log(f"Forward error: {e}")
                try:
                    http_delete(f"https://webhook.site/token/{WEBHOOK_SITE_UUID}/request/{rid}")
                except:
                    pass
        except Exception as e:
            log(f"Poll error: {e}")
        time.sleep(POLL_INTERVAL)

if __name__ == "__main__":
    poll()
