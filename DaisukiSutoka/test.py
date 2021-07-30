import os
import sys
import discord

from dotenv import load_dotenv
from pymongo import MongoClient
from RateLimiter import RateLimiter
from utils import handle_profile_message


load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

DAISUKI_USER_ID = 655888685086277632


mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]
coll = db[COLLECTION_NAME]

client = discord.Client()
rateLimiter = RateLimiter()

@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")
    # try:
    #     mongo_client.server_info()
    # except Exception:
    #     sys.exit(1)

    for guild in client.guilds:
        print(f"{guild.name}:{guild.id}")

@client.event
async def on_message(message):
    if message.author.id == DAISUKI_USER_ID:
        handle_profile_message(message, coll, rateLimiter)
        if len(message.embeds) != 1 or not message.embeds[0].title.endswith("'s Collection"):
            return
        print(message.embeds[0].title)

# data = [];
# for x in coll.find({}):
#     name = x['player']
#     tp = x['tp-scores']
#     data.append({
#         'id': name,
#         'data': tp
#     });

# for thing in data:
#     print(thing)


client.run(TOKEN)

