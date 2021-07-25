import re


def handle_tp_message(message, collection, rateLimiter):
    if len(message.embeds) != 1 or message.embeds[0].title != "Top Players":
        return

    # Rate limiting things
    if rateLimiter.seconds_since_tp(message) < 60 * 30:
        return
    rateLimiter.update_tp(message)

    data = []

    timestamp = message.created_at
    embed = message.embeds[0]

    if embed.fields:
        names = embed.fields[0].value.split("\n")
        scores = embed.fields[1].value.split("\n")

        for (name, score) in zip(names, scores):
            name = name.strip().split(". ", 1)[1]
            score = convert2int(score)
            data.append([timestamp.isoformat(timespec="milliseconds"), name, score])

    if embed.description:
        desc = embed.description.split("\n\n")

        for item in desc:
            x = item.split("\n")
            name = x[0].strip().split(". ", 1)[1]
            score = convert2int(x[1])
            data.append([timestamp.isoformat(timespec="milliseconds"), name, score])

    for timestamp, name, score in data:
        collection.find_one_and_update(
            {"player": name},
            {"$push": {"tp-scores": {"x": timestamp, "y": score}}},
            upsert=True,
        )


def handle_wl_messsage(message, collection, rateLimiter):
    if len(message.embeds) != 1 or "Wished by" not in message.content:
        return

    for mention in message.mentions:
        collection.find_one_and_update(
            {"player": mention.name},
            {"$push": {"wl-times": message.created_at}},
            upsert=True,
        )


def handle_store_message(message, collection, rateLimiter):
    if len(message.embeds) != 1 or "'s Store" not in message.embeds[0].title:
        return

    embed = message.embeds[0]
    player = embed.title.rsplit("'s ", 1)[0]

    if rateLimiter.seconds_since_sp(message, player) < 60 * 30:
        return
    rateLimiter.update_sp(message, player)

    sp_str = re.match(r"You have \*\*([0-9,]+) SP\*\*", embed.description).group(1)
    sp = convert2int(sp_str)

    collection.find_one_and_update(
        {"player": player}, {"$push": {"sp-values": {"x": message.created_at, "y": sp}}}
    )


def handle_collection_message(message, collection, rateLimiter):
    if len(message.embeds) != 1 or "'s Collection" not in message.embeds[0].title:
        return

    embed = message.embeds[0]
    player = embed.title.rsplit("'s ", 1)[0]

    if rateLimiter.seconds_since_sp(message, player) < 60 * 30:
        return
    rateLimiter.update_sp(message, player)

    sp_str = re.match(r"\*\*([0-9,]+) SP\*\*", embed.description).group(1)
    sp = convert2int(sp_str)

    collection.find_one_and_update(
        {"player": player}, {"$push": {"sp-values": {"x": message.created_at, "y": sp}}}
    )


def convert2int(s):
    return int("".join(filter(str.isdigit, s)))
