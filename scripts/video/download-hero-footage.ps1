param(
  [string]$OutDir = 'public/hero-footage/raw'
)

$ErrorActionPreference = 'Stop'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

New-Item -ItemType Directory -Force $OutDir | Out-Null

$clips = @(
  @{ File = '12-karnataka-jog-falls-b.mp4';    Url = 'https://videos.pexels.com/video-files/27487355/12151963_3840_2160_30fps.mp4' },
  @{ File = '14-india-kerala-tea-valley.mp4';  Url = 'https://videos.pexels.com/video-files/19669263/19669263-hd_1920_1080_25fps.mp4' },
  @{ File = '15-india-kerala-backwaters.mp4';  Url = 'https://videos.pexels.com/video-files/34742689/14728150_3840_2160_30fps.mp4' },
  @{ File = '04-epic-vietnam-landscape.mp4';   Url = 'https://videos.pexels.com/video-files/30391354/13024433_3840_2160_60fps.mp4' },
  @{ File = '16-europe-norway-fjord.mp4';      Url = 'https://videos.pexels.com/video-files/12004398/12004398-hd_1920_1080_24fps.mp4' },
  @{ File = '17-europe-switzerland-lake.mp4';  Url = 'https://videos.pexels.com/video-files/32649791/13920915_3840_2160_30fps.mp4' },
  @{ File = '18-europe-italy-coast.mp4';       Url = 'https://videos.pexels.com/video-files/30448961/13049971_3840_2160_30fps.mp4' },
  @{ File = '19-maldives-resort-water.mp4';    Url = 'https://videos.pexels.com/video-files/4069480/4069480-hd_1920_1080_25fps.mp4' },
  @{ File = '20-bali-rice-terraces.mp4';       Url = 'https://videos.pexels.com/video-files/10907984/10907984-hd_1920_1080_25fps.mp4' },
  @{ File = '21-europe-paris.mp4';             Url = 'https://videos.pexels.com/video-files/36492321/15473969_3840_2160_25fps.mp4' },
  @{ File = '22-dubai-skyline.mp4';            Url = 'https://videos.pexels.com/video-files/30481177/13061093_1920_1080_30fps.mp4' },
  @{ File = '23-europe-edinburgh.mp4';         Url = 'https://videos.pexels.com/video-files/19975223/19975223-hd_1920_1080_25fps.mp4' },
  @{ File = '24-europe-venice.mp4';            Url = 'https://videos.pexels.com/video-files/14078038/14078038-hd_1920_1080_30fps.mp4' },
  @{ File = '25-europe-santorini.mp4';         Url = 'https://videos.pexels.com/video-files/37902020/16081060_3840_2160_24fps.mp4' }
)

$jobs = @()
foreach ($clip in $clips) {
  $dest = Join-Path (Resolve-Path $OutDir) $clip.File
  if (Test-Path $dest) { Write-Host "SKIP (exists): $($clip.File)"; continue }
  Write-Host "Downloading $($clip.File)"
  $jobs += Start-Job -ArgumentList $clip.Url, $dest, $ua -ScriptBlock {
    param($url, $dest, $ua)
    curl.exe -sL --fail -H "User-Agent: $ua" -o $dest $url
    if ($LASTEXITCODE -ne 0) { throw "Failed: $url" }
  }
}

$jobs | Wait-Job | Out-Null
foreach ($job in $jobs) { Receive-Job $job; Remove-Job $job }

Get-ChildItem $OutDir | Sort-Object Name | Select-Object Name, @{N='MB';E={[math]::Round($_.Length/1MB,1)}} | Format-Table -AutoSize
