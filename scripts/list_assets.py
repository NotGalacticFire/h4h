import json
entries=json.load(open('scripts/extract_generated_entries_output.json'))
images=sorted({e['img'] for e in entries})
people=[{'name':e['name'],'page':e['href']} for e in entries]
print('IMAGES:')
for i in images:
    print(i)
print('\nDESCRIPTIONS:')
for p in people:
    print(f"{p['name']} -> add bio in {p['page']}")
