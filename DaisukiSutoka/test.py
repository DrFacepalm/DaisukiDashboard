import os
import sys
import discord
import re

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
        if len(message.embeds) != 1 or not message.embeds[0].title.endswith("'s Profile"):
            return  
        embed = message.embeds[0]
        print(embed.description)
        """
        **273,546 SP**
        **0 Enchant Dust**
        **4 Blessings**
        **Amplify Rolls x55**
        **Amplify SP Rolls x1**
        **Amplify Power Rolls x1**
        """
        data = []
        for field in embed.fields:
            value = field.value
            name = field.name
            
            m = re.match(r"Max Characters - ([0-9]+)", value)
            if m:
                m.group(0)
            m = re.match(r"Rolls Total - (")
            


        #     if (value)

        #     data.append([field.value, field.name])
        
        # for thing in data:

        #     print(thing)

        """
        name 
        value Max Characters - 28

        name Upgrade Level 4 - Enchant Level 4 - Bless Level 1
        value Rolls Total - 52

        name Upgrade Level 4 - Enchant Level 3 - Bless Level 0
        value SP Rolls Total - 7

        name Upgrade Level 4 - Enchant Level 4
        value Wishlist Slots Total - 13

        name Upgrade Level 4 - Enchant Level 4
        value Wishlist Chances Total - +8,000%

        name Upgrade Level 4 - Enchant Level 3
        value 💜 - 28% 💙 - 19% 💚 - 20% 🧡 - 33%

        name Upgrade Level 2 - Enchant Level 2 - Bless Level 0
        value Power Rolls Total - 4

        name Upgrade Level 2 - Enchant Level 2 - Bless Level 0
        value Free Claims Total - 4

        name Upgrade Level 2 - Enchant Level 1 - Bless Level 0
        value Power Claims Total - 3

        name Upgrade Level 2 - Enchant Level 1 - Bless Level 0
        value SP Claim Multiplier - x4

        name Upgrade Level 2 - Enchant Level 1
        value Wishlist Bonus Multiplier - x4

        name Upgrade Level 0 - Enchant Level 0
        value Power Claim Multiplier - x2

        name Bless Level 0
        value Extra Affection - 0
        """


        # handle_profile_message(message, coll, rateLimiter)
        # if len(message.embeds) != 1 or not message.embeds[0].title.endswith("'s Collection"):
        #     return
        # print(message.embeds[0].title)

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

