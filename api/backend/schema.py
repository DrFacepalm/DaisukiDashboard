from marshmallow import Schema, fields

class TaskSchema(Schema):
  _id = fields.Str()
  category = fields.Str()
  task = fields.Str()
  assigned = fields.Str()
  points = fields.Int()

