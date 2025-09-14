import json, os, re, subprocess, sys
sys.path.append('scripts')
from compute_new_chapters import slugify

# Get new chapters JSON
out = subprocess.check_output(['python3','scripts/compute_new_chapters.py']).decode('utf-8')
obj=json.loads(out)
new = obj['new']

html_files=[f for f in os.listdir('.') if f.endswith('.html')]

def find_existing_page_for_name(name):
    slug=slugify(name)
    path=f"{slug}.html"
    if os.path.exists(path):
        return path
    pat = re.compile(rf"<h1>\s*{re.escape(name)}\s*</h1>", re.I)
    for f in html_files:
        try:
            with open(f, 'r', encoding='utf-8', errors='ignore') as fh:
                txt=fh.read()
            if pat.search(txt):
                return f
        except Exception:
            pass
    return None

links={}
missing_pages=[]
for pill, info in new.items():
    name=info['name']
    slug=info['slug']
    href=find_existing_page_for_name(name) or f"{slug}.html"
    links[pill]={'name':name,'slug':slug,'href':href}
    if not os.path.exists(href):
        missing_pages.append({'name':name,'slug':slug,'role_pill':pill})

if __name__ == '__main__':
    print(json.dumps({'links':links,'missing_pages':missing_pages}, ensure_ascii=False, indent=2))
