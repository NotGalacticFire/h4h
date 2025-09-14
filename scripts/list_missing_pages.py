import json, os
entries=json.load(open('scripts/extract_generated_entries_output.json')) if os.path.exists('scripts/extract_generated_entries_output.json') else None
if entries is None:
    import subprocess
    entries=json.loads(subprocess.check_output(['python3','scripts/extract_generated_entries.py']).decode('utf-8'))
missing=[e for e in entries if not os.path.exists(e['href'])]
print(json.dumps(missing, indent=2))
