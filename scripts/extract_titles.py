import re
html=open('about.html').read()
titles=re.findall(r'class="chapter-pill">([^<]+)<', html)
for t in titles:
    print(t.strip())
