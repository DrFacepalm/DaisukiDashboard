# DaisukuSutoka

This is a discord bot that will stalk the Daisuki bot in a server, and record stats about players.


## Development

**Starting the venv**
```bash
source env/bin/activate # linux
```

**Connecting to mongodb docker**
When hosting a local docker mongodb, use:
```bash
docker run -p <someport>:27017 --name <name> -d mongo
```
Then you'll  be able to connect to it via localhost using python, and the port you selected.