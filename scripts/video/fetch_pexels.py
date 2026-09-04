import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def get_pexels_video_url(video_id_or_url):
    if isinstance(video_id_or_url, int) or video_id_or_url.isdigit():
        url = f"https://www.pexels.com/video/{video_id_or_url}/"
    else:
        url = video_id_or_url
    
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find video download links or source tags
        matches = re.findall(r'https://videos\.pexels\.com/video-files/[^"\']+\.mp4', html)
        if matches:
            # Sort or get high res (like 1080p or 2160p / 3840x2160)
            return list(set(matches))
        # Fallback to general mp4 regex
        mp4s = re.findall(r'https://[^\s"\']+\.mp4', html)
        return list(set([m for m in mp4s if 'pexels' in m]))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return []

# Test with Hallstatt ID 4923086
print("Testing Hallstatt 4923086:")
urls = get_pexels_video_url(4923086)
for u in urls[:5]:
    print(u)
