import os
import discord
from dotenv import load_dotenv
from pymongo import MongoClient
from utils import handle_tp_message, handle_wl_messsage

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
MODE = os.getenv("MODE", "development")
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

DAISUKI_USER_ID = 655888685086277632

client = discord.Client()

mongo_client = None
db = None
coll = None
if MONGO_URL and MODE == "production":
    print(MONGO_URL)
    mongo_client = MongoClient(MONGO_URL)
    db = mongo_client[DB_NAME]
    coll = db[COLLECTION_NAME]


def convert2int(s):
    return int("".join(filter(str.isdigit, s)))


@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")

    for guild in client.guilds:
        print(f"{guild.name}:{guild.id}")


@client.event
async def on_message(message):
    if message.author.id != DAISUKI_USER_ID:
        handle_tp_message(message, coll)
        handle_wl_messsage(message, coll)


client.run(TOKEN)
