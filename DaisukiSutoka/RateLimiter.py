from datetime import datetime


class RateLimiter:
    def __init__(self):
        self.tp_time = None
        self.sp_times = {}

    def update_tp(self, message):
        self.tp_time = message.created_at

    def seconds_since_tp(self, message):
        if self.tp_time is None:
            self.tp_time = datetime.min
        difference = message.created_at - self.tp_time
        return difference.seconds

    def update_sp(self, message, name):
        self.sp_times[name] = message.created_at

    def seconds_since_sp(self, message, name):
        if name not in self.sp_times:
            self.sp_times[name] = datetime.min
        difference = message.created_at - self.sp_times[name]
        return difference.seconds
