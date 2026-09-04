import subprocess
import os

items = [
    {
        "name": "eiffel_night",
        "url": "https://www.youtube.com/watch?v=fdHbXEQlQoA",
        "start": "00:00:05",
        "end": "00:00:09",
        "out_webm": "public/hero-footage/raw/34-paris-eiffel-night.webm",
        "out_mp4": "public/hero-footage/raw/34-paris-eiffel-night.mp4",
        "frame": "scratch/frame_34_eiffel.jpg"
    },
    {
        "name": "burj_night",
        "url": "https://www.youtube.com/watch?v=oOoDvZRM1Lk",
        "start": "00:00:25",
        "end": "00:00:29",
        "out_webm": "public/hero-footage/raw/35-dubai-burj-khalifa-night.webm",
        "out_mp4": "public/hero-footage/raw/35-dubai-burj-khalifa-night.mp4",
        "frame": "scratch/frame_35_burj.jpg"
    },
    {
        "name": "hallstatt",
        "url": "https://www.youtube.com/watch?v=f12IcpbNs_Q",
        "start": "00:00:15",
        "end": "00:00:19",
        "out_webm": "public/hero-footage/raw/36-austria-hallstatt.webm",
        "out_mp4": "public/hero-footage/raw/36-austria-hallstatt.mp4",
        "frame": "scratch/frame_36_hallstatt.jpg"
    },
    {
        "name": "finland",
        "url": "https://www.youtube.com/watch?v=NoeptbkKizc",
        "start": "00:00:40",
        "end": "00:00:44",
        "out_webm": "public/hero-footage/raw/37-finland-lapland.webm",
        "out_mp4": "public/hero-footage/raw/37-finland-lapland.mp4",
        "frame": "scratch/frame_37_finland.jpg"
    },
    {
        "name": "vienna",
        "url": "https://www.youtube.com/watch?v=LsWv1fJ3qv0",
        "start": "00:01:10",
        "end": "00:01:14",
        "out_webm": "public/hero-footage/raw/38-austria-vienna.webm",
        "out_mp4": "public/hero-footage/raw/38-austria-vienna.mp4",
        "frame": "scratch/frame_38_vienna.jpg"
    }
]

for item in items:
    print(f"\n==========================================")
    print(f"Downloading: {item['name']}")
    print(f"==========================================")
    dl_cmd = [
        "yt-dlp",
        "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
        "--download-sections", f"*{item['start']}-{item['end']}",
        "--force-keyframes-at-cuts",
        "-o", item["out_webm"],
        item["url"]
    ]
    subprocess.run(dl_cmd)
    
    # Transcode to mp4
    if os.path.exists(item["out_webm"]):
        transcode_cmd = [
            "ffmpeg", "-y", "-i", item["out_webm"],
            "-c:v", "libx264", "-crf", "18", "-preset", "fast",
            item["out_mp4"]
        ]
        subprocess.run(transcode_cmd)
        
        # Extract preview frame
        frame_cmd = [
            "ffmpeg", "-y", "-ss", "00:00:01", "-i", item["out_mp4"],
            "-vframes", "1", "-update", "1",
            os.path.join(r"C:\Users\SaiPr\.gemini\antigravity-ide\brain\34f144ea-79e2-475d-a74c-46e0e55e85ba", item["frame"])
        ]
        subprocess.run(frame_cmd)

print("\nALL 5 CLIPS DOWNLOADED AND PROCESSED!")
