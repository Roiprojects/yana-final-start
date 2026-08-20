import os
import subprocess

videos = [
    {
        "url": "https://www.youtube.com/watch?v=aZ3wbGmyBrY",
        "start": "14:12",
        "end": "14:20",
        "out": "public/hero-footage/raw/30-new-jog.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=2GqVcKSLjRg",
        "start": "01:46",
        "end": "01:52",
        "out": "public/hero-footage/raw/31-new-kerala.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=40I4oB9MEQ0",
        "start": "32:35",
        "end": "32:40",
        "out": "public/hero-footage/raw/32-new-italy.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=QoaDkejcHSc",
        "start": "08:00",
        "end": "08:04",
        "out": "public/hero-footage/raw/33-new-georgia.mp4"
    }
]

for v in videos:
    print(f"Downloading {v['out']}...")
    cmd = [
        "yt-dlp",
        "--download-sections", f"*{v['start']}-{v['end']}",
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--force-keyframes-at-cuts",
        "-o", v['out'],
        v['url']
    ]
    subprocess.run(cmd)

print("Done downloading!")
