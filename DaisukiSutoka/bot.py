import os
import discord

from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")

client = discord.Client()

def convert2int(s):
    return int(''.join(filter(str.isdigit, s)))

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')   

    for guild in client.guilds:
        print(f'{guild.name}:{guild.id}')

@client.event
async def on_message(message):


    if (len(message.embeds) > 0 and message.embeds[0].title == "Top Players"):
        data = []

        timestamp = message.created_at

        if (message.embeds[0].fields):
            # $tp, desktop
            # for $tp, its a list of 
            # [
            # {value="1. Name\n 2.Name\n 3.Name\n"}, 
            # {value="100\n99\n98\n"}
            # ]
            
            
            names = message.embeds[0].fields[0].value.split('\n')
            scores = message.embeds[0].fields[1].value.split('\n')


            for (name, score) in zip(names, scores):
                name = name.strip()
                score = convert2int(score)
                data.append([timestamp, name, score])



        if (message.embeds[0].description):
            # $tp, mobile
            # for $tp its  1. name\n(100)\n\n2. name\n(100)\n\n
            
            desc = message.embeds[0].description.split("\n\n")
            # [ 1. name\n(100), ...]
            (100)
            for item in desc:
                x = item.split('\n')
                data.append([timestamp, x[0].strip(), convert2int(x[1])])

            
        for x in data:
            print(x)

    

client.run(TOKEN)