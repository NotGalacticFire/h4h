import re, json
s=open('about.html','r',encoding='utf-8',errors='ignore').read()
results=[]
for m in re.finditer(r'<!--\s*(.*?)\s*-->', s, flags=re.S):
    block=m.group(1)
    if 'id="member-' not in block:
        continue
    pill=''
    pm=re.search(r'class=\"chapter-pill\">([^<]+)<', block)
    if pm:
        pill=pm.group(1).strip()
    for m2 in re.finditer(r'<div class=\"team-info\">\s*<h3>([^<]+)</h3>', block):
        results.append({'name':m2.group(1).strip(),'chapter':pill})
print(json.dumps(results, indent=2))
