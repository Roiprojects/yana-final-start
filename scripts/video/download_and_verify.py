import subprocess
import os
import sys

clips_to_test = [
    {
        "id": "eiffel",
        "url": "https://www.youtube.com/watch?v=rmMj3df9wl4",
        "start": "00:00:20",
        "end": "00:00:24",
        "out": "public/hero-footage/raw/34-paris-eiffel-night.mp4"
    },
    {
        "id": "burj",
        "url": "https://www.youtube.com/watch?v=io40bNwucLs",
        "start": "00:00:30",
        "end": "00:00:34",
        "out": "public/hero-footage/raw/35-dubai-burj-khalifa-night.mp4"
    },
    {
        "id": "hallstatt",
        "url": "https://www.youtube.com/watch?v=f12IcpbNs_Q",
        "start": "00:00:15",
        "end": "00:00:19",
        "out": "public/hero-footage/raw/36-austria-hallstatt.mp4"
    },
    {
        "id": "finland",
        "url": "https://www.youtube.com/watch?v=NoeptbkKizc",
        "start": "00:00:40",
        "end": "00:00:44",
        "out": "public/hero-footage/raw/37-finland-lapland.mp4"
    },
    {
        "id": "vienna",
        "url": "https://www.youtube.com/watch?v=LsWv1fJ3qv0",
        "start": "00:01:10",
        "end": "00:01:14",
        "out": "public/hero-footage/raw/38-austria-vienna.mp4"
    }
]

for c in clips_to_test:
    print(f"Downloading {c['id']} from {c['url']} [{c['start']} - {c['end']}]...")
    cmd = [
        "yt-dlp",
        "--download-sections", f"*{c['start']}-{c['end']}",
        "-f", "bestvideo[ext=mp4][height<=2160]+bestaudio/best[ext=mp4]/best",
        "--force-keyframes-at-cuts",
        "-o", c['out'],
        c['url']
    ]
    subprocess.run(cmd)

print("All downloads finished!")
