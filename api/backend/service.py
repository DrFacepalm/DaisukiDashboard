from .mongo import Repository, MongoRepository
from .schema import TaskSchema

class Service(object):
    def __init__(self, repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client

    def find_all_tasks(self):
        kudos  = self.repo_client.find_all({})
        return [self.dump(kudo) for kudo in kudos]

    def find_tasks(self, category):
        kudos  = self.repo_client.find_all({'category': category})
        return [self.dump(kudo) for kudo in kudos]

    def find_specific_task(self, task, category):
        data = self.repo_client.find({'category': category, 'task': task})
        return self.dump(data)

    def create_task_for(self, data):
        # data = {'category': category, 'task': task}
        self.repo_client.update(data, data, True)
        return self.dump(data)

    def update_task_with(self, category, task, updated):
        records_affected = self.repo_client.update({'category': category, 'task': task}, updated)
        return records_affected > 0

    def delete_task_for(self, category, task):
        records_affected = self.repo_client.delete({'category': category, 'task': task})
        return records_affected > 0

    def dump(self, data):
        return TaskSchema(exclude=['_id']).dump(data)
