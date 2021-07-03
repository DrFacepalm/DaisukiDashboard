import json

with open("tp.txt", "r") as tp_file:
    data = tp_file.read()

data_splitted = data.split("\n\n")

def convert2int(s):
    return int(''.join(filter(str.isdigit, s)))

results = []
current = []
cd = {}
number = 0
for d in data_splitted:
    if d.startswith("2021"):
        print(f"{d}:", end=" ")
        # this is a date
        if number == 1:
            # mobile
            print("mobile handling")
            scores = current[0].split(")\n")
            for s in scores:
                key, value = s.split("\n")
                key = key.split(". ")[1]
                value = value.split("(")[1]
                cd[key] = convert2int(value)
        elif number == 2:
            # desktop
            print("desktop handling")
            keys = current[0].split("\n")
            values = current[1].split("\n")
            for i in range(len(keys)):
                key = keys[i].split(". ")[1]
                cd[key] = convert2int(values[i])
        else:
            print("IDK, broken")
            break
        cd["date"] = d
        results.append(cd)
        current = []
        cd = {}
        number = 0
    else:
        current.append(d)
        number += 1
        
# print(results)

final_data = {}
for r in results:
    date = r["date"].replace("Z", "+0000")
    for key,value in r.items():
        if key == "date":
            continue
        data_point = {"x": date, "y": value}
        if key in final_data:
            final_data[key]["data"].append(data_point)
        else:
            final_data[key] = {"id": key, "data": [data_point]}

new_result = []
for v in final_data.values():
    new_result.append(v)

with open("tp.json", "w") as f:
    json.dump(new_result, f)