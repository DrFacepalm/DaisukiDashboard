import os
import re
import time
import discord

from dotenv import load_dotenv
from pymongo import MongoClient
from RateLimiter import RateLimiter

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
MODE = os.getenv("MODE", "development")

DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

DAISUKI_USER_ID = 655888685086277632

client = discord.Client()
rateLimiter = RateLimiter()


@client.event
async def on_ready():
    print(f"{client.user} has connected to Discord!")

    for guild in client.guilds:
        print(f"{guild.name}:{guild.id}")


def convert2int(s):
    return int("".join(filter(str.isdigit, s)))


@client.event
async def on_message(message):
    if len(message.embeds) != 1 or "'s Collection" not in message.embeds[0].title:
        return

    embed = message.embeds[0]

    player = embed.title.rsplit("'s ", 1)[0]

    sp_str = re.match(r"\*\*([0-9,]+) SP\*\*", embed.description).group(1)

    # embed.description.split("SP**")[0].split("**")[0].strip()

    print("sp str", convert2int(sp_str))
    print("player", player)
    # print("sp", sp)

    # if rateLimiter.seconds_since_sp(message) < 15:
    #     return
    # rateLimiter.update_sp(message)

    # print(message.content)

    # messages = await channel.history(oldest_first=True, after=None, limit=2).flatten()
    # difference = messages[1].created_at - messages[0].created_at
    # print("hours", difference.seconds // 3600)

    # if message.author.id == DAISUKI_USER_ID:
    #     print("ASDFASDF")
    # if message.content != "!@#$%^&*()test":
    #     return

    # channel = message.channel

    # after = None
    # loopy = True

    # while loopy:
    #     messages = await channel.history(oldest_first=True, after=None, limit=80).flatten()

    #     if len(messages) < 0:
    #         loopy = False
    #         break

    #     after = messages[-1].created_at

    #     wishes = 0
    #     for message in messages:
    #         if "Wished by" in message.content:
    #             wishes += 1
    #     time.sleep(5)
    #     print(wishes)

    # if len(message.mentions) > 0:
    #     if "Wished by" in message.content:
    #         for mention in message.mentions:
    #             print(mention.name, message.created_at)


client.run(TOKEN)


# collection.find_one_and_update(
#     {'player': 'awoefajw'},
#     {'$push': {
#         'tp-scores': {
#             "x": "2021-08-03T22:46:07.860",
#             "y": 229349
#         }
#     }},
#     upsert=True
# )


# for d in collection.find({}):
#     print(d)
# print(collection.find({'player': 'poop'}))

# print(data_id)
