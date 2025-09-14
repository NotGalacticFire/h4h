import re
s=open('about.html','r',encoding='utf-8',errors='ignore').read()
for m in re.finditer(r'<h3 class="chapter-title"><span class="chapter-pill">([^<]+)</span></h3>', s):
    line=s[:m.start()].count('\n')+1
    print(f"{line}: {m.group(1)}")
