import os
import sys
from dotenv import load_dotenv

try:
    tp_delay = int(os.getenv("TP_DELAY", "1800"))
    sp_delay = int(os.getenv("SP_DELAY", "1800"))
    enchant_delay = int(os.getenv("ENCHANT_DELAY", "1800"))
    blessing_delay = int(os.getenv("BLESSING_DELAY", "1800"))
    profile_delay = int(os.getenv("PROFILE_DELAY", "1800"))
except ValueError as e:
    sys.exit("Malformed Configuration");
