import os 
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", None)
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]
coll = db[COLLECTION_NAME]

print(f'Printing data from {DB_NAME} {COLLECTION_NAME}\n\n\n')

coll.insert_one({'hello': 'yes'});

for x in coll.find({}):
    print(x)

print('========================================\n\n')
