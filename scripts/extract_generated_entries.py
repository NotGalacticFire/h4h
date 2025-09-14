import re, os, json
html=open('about.html').read()
# extract block between BEGIN and END comments
m=re.search(r'<!-- BEGIN: Generated Chapter Groups -->([\s\S]*?)<!-- END: Generated Chapter Groups -->', html)
entries=[]
if m:
    block=m.group(1)
    # For each group
    groups=re.findall(r'<div id=\"([a-z0-9-]+)-chapter\"[\s\S]*?<div class=\"team-grid\">([\s\S]*?)</div>\s*</div>', block)
    for ch_id, grid in groups:
        m2=re.search(r'<div id=\"member-([a-z0-9-]+)\" class=\"team-card\">[\s\S]*?<a href=\"([^\"]+)\"[\s\S]*?<img src=\"([^\"]+)\" alt=\"([^\"]+)', grid)
        if m2:
            slug, href, img, name = m2.groups()
            entries.append({'chapter_id':ch_id,'slug':slug,'href':href,'img':img,'name':name})
print(json.dumps(entries, indent=2))
