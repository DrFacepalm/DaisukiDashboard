import os
import sys
import discord

from dotenv import load_dotenv
from pymongo import MongoClient
from RateLimiter import RateLimiter


load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

DAISUKI_USER_ID = 655888685086277632


mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]
coll = db[COLLECTION_NAME]


data = [];
for x in coll.find({}):
    name = x['player']
    tp = x['tp-scores']
    data.append({
        'id': name,
        'data': tp
    });

for thing in data:
    print(thing)

