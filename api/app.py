import os
import sys
from dotenv import load_dotenv

from pymongo import MongoClient
from flask import Flask, json
from flask_cors import CORS

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", None)
DB_NAME = os.getenv("DB_NAME", "test_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "test_coll")

mongo_client = MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]
coll = db[COLLECTION_NAME]

app = Flask(__name__)
CORS(app)

try:
    mongo_client.server_info()
except Exception as e:
    sys.exit(1)


@app.route("/", methods=["GET"])
def index():
    endpoints = ["/tp_scores"]
    return json_response(
        {"description": "This is the DaisukiSutoka backend api", "endpoints": endpoints}
    )


@app.route("/tp_scores", methods=["GET"])
def tp_scores():
    data = []
    for x in coll.find({}):
        name = x["player"]
        tp = x["tp-scores"]
        data.append({"id": name, "data": tp})

    return json_response(data)


# @app.route("/task/<string:category>/<string:task>", methods=["GET"])
# def show(category, task):
#     kudo = Backend().find_specific_task(task,category)

#     if kudo:
#         return json_response(kudo)
#     else:
#         return json_response({'error': 'kudo not found'}, 404)


# @app.route("/task/<string:category>/<string:task>", methods=["PUT"])
# def update(category, task):
#     current_task = TaskSchema().load(json.loads(request.data))

#     if "errors" in current_task:
#         return json_response({'error': current_task.errors}, 422)

#     backend = Backend()
#     if backend.update_task_with(category, task, current_task):
#         return json_response(current_task)
#     else:
#         return json_response({'error': 'kudo not found'}, 404)


# @app.route("/task/<string:category>/<string:task>", methods=["DELETE"])
# def delete(category, task):
# backend = Backend()
# if backend.delete_task_for(category, task):
#     return json_response({})
# else:
#     return json_response({'error': 'kudo not found'}, 404)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {"content-type": "application/json"})
