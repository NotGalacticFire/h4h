import csv, json, sys
rows=[]
with open('Chapter Application - Hearts for Healing (Responses) - Form Responses 1.csv', newline='') as f:
    reader = csv.DictReader(f)
    for r in reader:
        rows.append(r)
out=[]
for r in rows:
    fn=r.get('First Name, Last Name') or r.get('First Name') or ''
    country=(r.get('Country') or '').strip()
    city=(r.get('City') or '').strip()
    citystate=(r.get('City and state') or '').strip()
    loc_city = city if city else citystate
    out.append({'name':fn.strip(), 'country':country, 'city':loc_city, 'city_raw':city, 'citystate':citystate})
print(json.dumps(out, indent=2))
