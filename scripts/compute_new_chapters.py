import csv, re, unicodedata, json
# Load CSV
rows=[]
with open('Chapter Application - Hearts for Healing (Responses) - Form Responses 1.csv', newline='') as f:
    reader = csv.DictReader(f)
    rows=list(reader)

# Extract existing chapter pill titles
html=open('about.html').read()
existing=re.findall(r'class=\"chapter-pill\">([^<]+)<', html)
existing_set={t.strip() for t in existing}

# Helper to normalize names to slug and display

def slugify(name):
    name=name.strip()
    name=name.replace('\u200d',' ').replace('\u00A0',' ')
    name=re.sub(r"[,\.]+"," ", name)
    toks=[t for t in re.split(r"\s+", name) if t]
    if len(toks)>=2:
        first=toks[0]
        last=toks[-1]
    elif len(toks)==1:
        first=toks[0]
        last=''
    else:
        first=''
        last=''
    base=f"{first}-{last}".strip('-').lower()
    base=unicodedata.normalize('NFKD', base).encode('ascii','ignore').decode('ascii')
    base=re.sub(r'[^a-z0-9-]','', base)
    base=re.sub(r'-+','-', base)
    return base

US_STATES = {
    'AL': 'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'
}

def clean_val(s: str) -> str:
    s = (s or '').strip()
    if s.upper() in { 'N/A', 'NA', 'NONE', 'NIL', '.' }:
        return ''
    # remove stray leading dots
    s = s.lstrip('.')
    return re.sub(r"\s+", " ", s)

# Prepare list of prospective chapters
pros=[]
for r in rows:
    name=clean_val(r.get('First Name, Last Name') or r.get('First Name') or '')
    country=clean_val(r.get('Country'))
    city=clean_val(r.get('City'))
    citystate=clean_val(r.get('City and state'))
    # Determine location display
    us = country.lower() in {'usa','united states','united states of america','u.s.','unites states','u.s','us'}
    if us:
        # use city + state if available
        state = US_STATES.get(citystate.upper(), citystate)
        # If city contains a comma (e.g., "Scarsdale, NY"), take the part before comma
        loc_city = city.split(',')[0].strip() if ',' in city else (city or citystate)
        if loc_city and state and state not in loc_city:
            loc_display=f"{loc_city}, {state}"
        else:
            loc_display=loc_city or state
    else:
        loc_city = city or citystate
        if loc_city and country:
            loc_display=f"{loc_city}, {country}"
        else:
            loc_display=country or loc_city
    loc_display=(loc_display or '').strip()
    loc_display=re.sub(r"\s+,\s+", ", ", loc_display)
    loc_display=re.sub(r"\s+", " ", loc_display)
    pros.append({
        'name': name,
        'slug': slugify(name),
        'pill': loc_display,
        'country': country,
    })

# Deduplicate by pill and choose the first founder per new chapter
new_chapters={}
for p in pros:
    pill=p['pill']
    if not pill:
        continue
    if 'Kenya' in pill:
        pill='Kenya'
    if pill in existing_set:
        continue
    if pill in {'Frisco, Texas','Los Angeles, California','Lawrenceville, Georgia','Scarsdale, New York','Anseong, South Korea','Jeddah, Saudi Arabia','Kenya'}:
        continue
    if pill not in new_chapters:
        new_chapters[pill]=p

if __name__ == '__main__':
    print(json.dumps({'existing':sorted(existing_set), 'new':new_chapters}, ensure_ascii=False, indent=2))
