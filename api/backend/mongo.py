import os
from pymongo import MongoClient

COLLECTION_NAME = 'backend'

class Repository(object):
 def __init__(self, adapter=None):
   self.client = adapter()

 def find_all(self, selector):
   return self.client.find_all(selector)
 
 def find(self, selector):
   return self.client.find(selector)
 
 def create(self, kudo):
   return self.client.create(kudo)
  
 def update(self, selector, kudo, upsert=False):
   return self.client.update(selector, kudo, upsert)
  
 def delete(self, selector):
   return self.client.delete(selector)

class MongoRepository(object):
 def __init__(self):
   mongo_url = os.environ['MONGO_URL']
   self.db = MongoClient(mongo_url).backend

 def find_all(self, selector):
   return self.db.backend.find(selector)
 
 def find(self, selector):
   return self.db.backend.find_one(selector)
 
 def create(self, kudo):
   return self.db.backend.insert_one(kudo)

 def update(self, selector, kudo, upsert=False):
   return self.db.backend.replace_one(selector, kudo, upsert).modified_count
 
 def delete(self, selector):
   return self.db.backend.delete_one(selector).deleted_count