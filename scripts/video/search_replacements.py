import subprocess
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

targets = {
    'eiffel_full_night': 'eiffel tower paris night full view lights sparkling drone 4k 60fps',
    'burj_full_night': 'burj khalifa night skyline drone full tower lights on 4k',
    'vietnam_halong': 'ha long bay vietnam drone 4k emerald water 60fps'
}

for name, q in targets.items():
    print(f'=== {name} ===')
    cmd = ['yt-dlp', '--flat-playlist', '-J', f'ytsearch6:{q}']
    res = subprocess.run(cmd, capture_output=True, text=True, errors='ignore')
    try:
        data = json.loads(res.stdout)
        for entry in data.get('entries', []):
            print(f"{entry.get('id')} | {entry.get('title')} | {entry.get('duration')}s")
    except Exception as e:
        print(f"Error parsing {name}: {e}")
