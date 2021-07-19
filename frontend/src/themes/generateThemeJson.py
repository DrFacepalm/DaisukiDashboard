from glob import glob
import re
import json

mypath = "*.css"
outpath = "themes.json"

onlyfiles = glob(mypath)

result = {}

for of in onlyfiles:
    with open(of, "r") as f:
        data = re.match(":root {[^}]*}", f.read(), flags=re.MULTILINE)
        data = data.group(0).split("\n")[1:-1]
    current_file = {}
    for line in data:
        splitted = line.strip(" ;\t\n").split(":")
        print(splitted)
        key = splitted[0]
        value = splitted[1]
        current_file[key] = value
    result[of[:-4]] = current_file

print(result)
with open(outpath, "w") as f:
    json.dump(result, f)
        