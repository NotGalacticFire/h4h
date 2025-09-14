import re, json
s=open('about.html','r',encoding='utf-8',errors='ignore').read()
commented=[]
for m in re.finditer(r'<!--\s*(.*?)\s*-->', s, flags=re.S):
    block=m.group(1)
    if 'id="member-' in block:
        # capture names inside team-info h3
        for m2 in re.finditer(r'<div class=\"team-info\">\s*<h3>([^<]+)</h3>', block):
            commented.append(m2.group(1).strip())
        if not re.search(r'<div class=\"team-info\">', block):
            # fallback to any <h3> not containing 'Chapter'
            for m3 in re.finditer(r'<h3>([^<]+)</h3>', block):
                name=m3.group(1).strip()
                if 'Chapter' not in name:
                    commented.append(name)

print(json.dumps(commented, indent=2))
