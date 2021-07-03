from pymongo import MongoClient
from datetime import datetime

client = MongoClient('localhost', 27017)

db = client.test_database

collection = db.test_collection

# data = {
#     "player": "moop",
#     "tp-scores": [
#         {
#             "x": "2021-07-03T22:46:03.820",
#             "y": 12345
#         },
#         {
#             "x": "2021-07-03T22:46:04.160",
#             "y": 123455
#         },
#         {
#             "x": "2021-07-03T22:46:05.820",
#             "y": 123456
#         },
#         {
#             "x": "2021-07-03T22:46:06.820",
#             "y": 1234578
#         },
#         {
#             "x": "2021-07-03T22:46:07.860",
#             "y": 1234589
#         },
#     ],
# }

# data_id = collection.insert_one(data).inserted_id




collection.find_one_and_update(
    {'player': 'awoefajw'},
    {'$push': {
        'tp-scores': { 
            "x": "2021-08-03T22:46:07.860",
            "y": 229349
        }
    }},
    upsert=True
)



for d in collection.find({}):
    print(d)
# print(collection.find({'player': 'poop'}))

# print(data_id)



