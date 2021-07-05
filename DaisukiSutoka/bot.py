import os
import discord
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
MODE = os.getenv("MODE", "development")
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

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

    if len(message.embeds) > 0 and message.embeds[0].title == "Top Players":
        data = []

        timestamp = message.created_at

        if message.embeds[0].fields:
            names = message.embeds[0].fields[0].value.split("\n")
            scores = message.embeds[0].fields[1].value.split("\n")

            for (name, score) in zip(names, scores):
                name = name.strip().split(". ")[1]
                score = convert2int(score)
                data.append([timestamp.isoformat(timespec="milliseconds"), name, score])

        if message.embeds[0].description:
            desc = message.embeds[0].description.split("\n\n")

            for item in desc:
                x = item.split("\n")
                name = x[0].strip().split(". ")[1]
                score = convert2int(x[1])
                data.append([timestamp.isoformat(timespec="milliseconds"), name, score])

        for timestamp, name, score in data:
            if MODE == "development":
                f = open(f"{name}.dat", "a")
                f.write(f"{timestamp}, {score}\n")
                f.close()
            if MODE == "production":
                coll.find_one_and_update(
                    {"player": name},
                    {"$push": {"tp-scores": {"x": timestamp, "y": score}}},
                    upsert=True
                )


client.run(TOKEN)
