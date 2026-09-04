import subprocess
import os

items = [
    {
        "name": "burj_khalifa_night",
        "url": "https://www.youtube.com/watch?v=A7EyJ_52xko",
        "start": "00:00:10",
        "end": "00:00:14",
        "out": "public/hero-footage/raw/35-dubai-burj-khalifa-night.mp4",
        "frame": "scratch/frame_35_burj.jpg"
    },
    {
        "name": "hallstatt_clean",
        "url": "https://www.youtube.com/watch?v=Rkv_a-unbUc",
        "start": "00:00:20",
        "end": "00:00:24",
        "out": "public/hero-footage/raw/36-austria-hallstatt.mp4",
        "frame": "scratch/frame_36_hallstatt_clean.jpg"
    },
    {
        "name": "vienna_clean",
        "url": "https://www.youtube.com/watch?v=u-DcF9yW0Yg",
        "start": "00:00:15",
        "end": "00:00:19",
        "out": "public/hero-footage/raw/38-austria-vienna.mp4",
        "frame": "scratch/frame_38_vienna.jpg"
    }
]

for item in items:
    print(f"\n==========================================")
    print(f"Downloading: {item['name']}")
    print(f"==========================================")
    temp_webm = item["out"] + ".webm"
    dl_cmd = [
        "yt-dlp",
        "-f", "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
        "--download-sections", f"*{item['start']}-{item['end']}",
        "--force-keyframes-at-cuts",
        "-o", temp_webm,
        item["url"]
    ]
    subprocess.run(dl_cmd)
    
    # Transcode to mp4 if downloaded
    target_in = None
    if os.path.exists(temp_webm):
        target_in = temp_webm
    elif os.path.exists(temp_webm + ".mkv"):
        target_in = temp_webm + ".mkv"
    elif os.path.exists(temp_webm + ".webm"):
        target_in = temp_webm + ".webm"
        
    if target_in:
        transcode_cmd = [
            "ffmpeg", "-y", "-i", target_in,
            "-c:v", "libx264", "-crf", "18", "-preset", "fast",
            item["out"]
        ]
        subprocess.run(transcode_cmd)
        
        # Extract preview frame
        frame_cmd = [
            "ffmpeg", "-y", "-ss", "00:00:01", "-i", item["out"],
            "-vframes", "1", "-update", "1",
            os.path.join(r"C:\Users\SaiPr\.gemini\antigravity-ide\brain\34f144ea-79e2-475d-a74c-46e0e55e85ba", item["frame"])
        ]
        subprocess.run(frame_cmd)

print("\nProcessing completed!")
