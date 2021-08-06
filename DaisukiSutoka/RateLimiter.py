from datetime import datetime


class RateLimiter:
    def __init__(self):
        self.tp_time = None
        self.sp_times = {}
        self.enchant_times = {}
        self.blessing_times = {}
        self.profile_times = {}

    # TP
    def update_tp(self, message):
        self.tp_time = message.created_at

    def seconds_since_tp(self, message):
        if self.tp_time is None:
            self.tp_time = datetime.min
        difference = message.created_at - self.tp_time
        return difference.seconds

    # SP
    def update_sp(self, message, name):
        self.sp_times[name] = message.created_at

    def seconds_since_sp(self, message, name):
        if name not in self.sp_times:
            self.sp_times[name] = datetime.min
        difference = message.created_at - self.sp_times[name]
        return difference.seconds

    # ENCHANTS
    def update_enchants(self, message, name):
        self.enchant_times[name] = message.created_at

    def seconds_since_enchants(self, message, name):
        if name not in self.sp_times:
            self.enchant_times[name] = datetime.min
        difference = message.created_at - self.enchant_times[name]
        return difference.seconds

    # BLESSINGS
    def update_blessings(self, message, name):
        self.blessing_times[name] = message.created_at

    def seconds_since_blessings(self, message, name):
        if name not in self.sp_times:
            self.blessing_times[name] = datetime.min
        difference = message.created_at - self.enchant_times[name]
        return difference.seconds

    # PROFILE
    def update_profile(self, message, name):
        self.profile_times[name] = message.created_at

    def seconds_since_profile(self, message, name):
        if name not in self.sp_times:
            self.profile_times[name] = datetime.min
        difference = message.created_at - self.profile_times[name]
        return difference.seconds
