#!/bin/bash
# Render start script for Narrative Rotator backend
cd narrative-rotator
pip install -r requirements.txt
python -m uvicorn src.server:app --host 0.0.0.0 --port ${PORT:-10000}
