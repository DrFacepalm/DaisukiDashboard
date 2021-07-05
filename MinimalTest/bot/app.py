from pymongo import MongoClient
import os 

client = MongoClient(os.environ['MONGO_URL'])

db = client.db

collection = db.collection 

collection.insert_one({'hello': 'world'})

for x in collection.find({}):
    print(x)

print("Hello World")