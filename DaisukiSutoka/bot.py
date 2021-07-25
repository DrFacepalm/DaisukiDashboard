import os
import sys
import discord

from dotenv import load_dotenv
from pymongo import MongoClient
from RateLimiter import RateLimiter
from utils import (
    handle_tp_message,
    handle_wl_messsage,
    handle_collection_message,
    handle_store_message,
)

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

DAISUKI_USER_ID = 655888685086277632

client = discord.Client()
rateLimiter = RateLimiter()

mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]
coll = db[COLLECTION_NAME]


@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")
    try:
        mongo_client.server_info()
    except Exception:
        sys.exit(1)

    for guild in client.guilds:
        print(f"{guild.name}:{guild.id}")


@client.event
async def on_message(message):
    if message.author.id == DAISUKI_USER_ID:
        handle_tp_message(message, coll, rateLimiter)
        handle_wl_messsage(message, coll, rateLimiter)
        handle_store_message(message, coll, rateLimiter)
        handle_collection_message(message, coll, rateLimiter)


client.run(TOKEN)
