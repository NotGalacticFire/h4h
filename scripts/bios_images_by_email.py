import csv, json, os, re, unicodedata

# Extract generated founder entries from about.html
html=open('about.html', encoding='utf-8').read()
m=re.search(r'<!-- BEGIN: Generated Chapter Groups -->([\s\S]*?)<!-- END: Generated Chapter Groups -->', html)
entries=[]
if m:
    block=m.group(1)
    groups=re.findall(r'<div id=\"([a-z0-9-]+)-chapter\"[\s\S]*?<div class=\"team-grid\">([\s\S]*?)</div>\s*</div>', block)
    for ch_id, grid in groups:
        m2=re.search(r'<div id=\"member-([a-z0-9-]+)\" class=\"team-card\">[\s\S]*?<a href=\"([^\"]+)\"[\s\S]*?<img src=\"([^\"]+)\" alt=\"([^\"]+)', grid)
        if m2:
            slug, href, img, name = m2.groups()
            entries.append({'name':name.strip(), 'href':href, 'img':img})

# Name normalizer

def norm_name(s: str) -> str:
    s = s.strip()
    s = s.replace('\u200d',' ').replace('\u00A0',' ')
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode('ascii')
    s = re.sub(r'[^a-zA-Z0-9\s]+',' ', s)
    s = re.sub(r'\s+',' ', s)
    s = s.lower().strip()
    toks=s.split()
    if len(toks)>=2:
        key=f"{toks[0]} {toks[-1]}"
    elif len(toks)==1:
        key=toks[0]
    else:
        key=''
    return key

# Build maps
gen_map={norm_name(e['name']): e for e in entries}

rows=[]
with open('Chapter Application - Hearts for Healing (Responses) - Form Responses 1.csv', newline='', encoding='utf-8') as f:
    reader=csv.DictReader(f)
    rows=list(reader)

csv_map={}
for r in rows:
    name=(r.get('First Name, Last Name') or r.get('First Name') or '').strip()
    if not name:
        continue
    key=norm_name(name)
    email=(r.get('Email Address') or '').strip()
    if key and email and key not in csv_map:
        csv_map[key]=email

# Build output
out=[]
for key, e in gen_map.items():
    email=csv_map.get(key, '')
    exists=os.path.exists(e['img'])
    out.append({
        'email': email or '(no email match found)',
        'name': e['name'],
        'bio_page': e['href'],
        'image': e['img'],
        'image_exists': exists,
    })

out.sort(key=lambda x: (x['email'], x['name']))
print(json.dumps(out, indent=2))
