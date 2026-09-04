import subprocess
import os

items = [
    {
        "name": "eiffel_full_night",
        "url": "https://www.youtube.com/watch?v=lSTurQEDawY",
        "start": "00:00:10",
        "end": "00:00:14",
        "out_webm": "public/hero-footage/raw/34-paris-eiffel-full-night.webm",
        "out_mp4": "public/hero-footage/raw/34-paris-eiffel-full-night.mp4",
        "frame": "scratch/frame_eiffel_full_night.jpg"
    },
    {
        "name": "burj_full_night",
        "url": "https://www.youtube.com/watch?v=bSnUid3jSXo",
        "start": "00:00:10",
        "end": "00:00:14",
        "out_webm": "public/hero-footage/raw/35-dubai-burj-full-night.webm",
        "out_mp4": "public/hero-footage/raw/35-dubai-burj-full-night.mp4",
        "frame": "scratch/frame_burj_full_night.jpg"
    },
    {
        "name": "vietnam_halong_smooth",
        "url": "https://www.youtube.com/watch?v=po-C1MhJGfw",
        "start": "00:00:15",
        "end": "00:00:19",
        "out_webm": "public/hero-footage/raw/04-vietnam-halong-smooth.webm",
        "out_mp4": "public/hero-footage/raw/04-vietnam-halong-smooth.mp4",
        "frame": "scratch/frame_vietnam_smooth.jpg"
    }
]

for item in items:
    print(f"\n==========================================")
    print(f"Downloading: {item['name']}")
    print(f"==========================================")
    dl_cmd = [
        "yt-dlp",
        "-f", "bestvideo+bestaudio/best",
        "--download-sections", f"*{item['start']}-{item['end']}",
        "--force-keyframes-at-cuts",
        "-o", item["out_webm"],
        item["url"]
    ]
    subprocess.run(dl_cmd)
    
    # Transcode to mp4
    target_in = item["out_webm"]
    if not os.path.exists(target_in):
        if os.path.exists(target_in + ".webm"):
            target_in = target_in + ".webm"
        elif os.path.exists(target_in + ".mkv"):
            target_in = target_in + ".mkv"
            
    if os.path.exists(target_in):
        transcode_cmd = [
            "ffmpeg", "-y", "-i", target_in,
            "-c:v", "libx264", "-crf", "18", "-preset", "fast",
            item["out_mp4"]
        ]
        subprocess.run(transcode_cmd)
        
        frame_cmd = [
            "ffmpeg", "-y", "-ss", "00:00:01", "-i", item["out_mp4"],
            "-vframes", "1", "-update", "1",
            os.path.join(r"C:\Users\SaiPr\.gemini\antigravity-ide\brain\34f144ea-79e2-475d-a74c-46e0e55e85ba", item["frame"])
        ]
        subprocess.run(frame_cmd)

print("\nREPLACEMENTS DOWNLOADED AND PROCESSED!")
