import subprocess
import json
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

targets = {
    'eiffel_night': 'paris eiffel tower night drone 4k stock',
    'burj_night': 'burj khalifa dubai night drone 4k 60fps',
    'hallstatt': 'hallstatt austria drone 4k landscape relaxing',
    'finland': 'finland lapland drone 4k northern lights winter landscape',
    'vienna': 'vienna austria drone 4k imperial architecture'
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
