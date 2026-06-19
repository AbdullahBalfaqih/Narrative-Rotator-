import logging
import os
import sys
import subprocess
import platform
from logging.handlers import RotatingFileHandler

def get_twak_cmd():
    """Returns the correct twak executable path for the current platform"""
    if platform.system() == "Windows":
        full_path = r"C:\Users\Abdullah\AppData\Roaming\npm\twak.cmd"
        if os.path.exists(full_path):
            return full_path
        return "twak.cmd"
    return "twak"

def setup_logger(name="narrative-rotator"):
    # Ensure logs folder exists
    os.makedirs("logs", exist_ok=True)
    
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    # Avoid duplicate handlers if setup multiple times
    if logger.handlers:
        return logger

    # Log Formatter
    formatter = logging.Formatter(
        '[%(asctime)s] %(levelname)s [%(name)s:%(filename)s:%(lineno)d] - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    # Console Handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # Rotating File Handler (Max 5MB file size, keep 5 files)
    file_handler = RotatingFileHandler(
        os.path.join("logs", "agent.log"),
        maxBytes=5 * 1024 * 1024,
        backupCount=5,
        encoding="utf-8"
    )
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger

# Shared global logger
logger = setup_logger()
