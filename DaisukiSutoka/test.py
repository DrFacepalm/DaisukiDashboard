from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("BOT_TOKEN")
MONGO_URL = os.getenv("MONGO_URL", None)
MODE = os.getenv("MODE", "development")

DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]






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



