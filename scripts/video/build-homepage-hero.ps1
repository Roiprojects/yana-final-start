param(
  [string]$ManifestPath = 'public/hero-footage/hero-reel-manifest.json'
)

$ErrorActionPreference = 'Stop'
$culture = [System.Globalization.CultureInfo]::InvariantCulture

if (-not (Test-Path $ManifestPath)) { throw "Missing manifest: $ManifestPath" }
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { throw 'ffmpeg not found on PATH' }
if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) { throw 'ffprobe not found on PATH' }

$manifest = Get-Content $ManifestPath -Raw | ConvertFrom-Json
$segments = @($manifest.segments)
if ($segments.Count -lt 8) { throw 'Expected at least 8 real footage segments' }

New-Item -ItemType Directory -Force 'public/hero' | Out-Null

function New-FilterComplex {
  param(
    [array]$Items,
    [int]$Width,
    [int]$Height
  )

  $parts = @()
  for ($i = 0; $i -lt $Items.Count; $i++) {
    $parts += "[$($i):v]scale=$Width`:$Height`:force_original_aspect_ratio=increase,crop=$Width`:$Height,fps=30,setsar=1,format=yuv420p[v$($i)]"
  }

  $labels = @()
  for ($j = 0; $j -lt $Items.Count; $j++) {
    $labels += "[v$($j)]"
  }

  $parts += (($labels -join '') + "concat=n=$($Items.Count):v=1:a=0[outv]")
  return ($parts -join ';')
}

function Invoke-ReelRender {
  param(
    [array]$Items,
    [int]$Width,
    [int]$Height,
    [int]$Crf,
    [string]$OutputPath
  )

  $args = @('-y')
  foreach ($item in $Items) {
    $start = [string]::Format($culture, '{0:0.###}', [double]$item.start)
    $duration = [string]::Format($culture, '{0:0.###}', [double]$item.duration)
    $args += @('-ss', $start, '-t', $duration, '-i', $item.src)
  }

  $filter = New-FilterComplex -Items $Items -Width $Width -Height $Height
  $args += @(
    '-filter_complex', $filter,
    '-map', '[outv]',
    '-an',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', "$Crf",
    '-movflags', '+faststart',
    $OutputPath
  )

  & ffmpeg @args
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $OutputPath" }
}

Invoke-ReelRender -Items $segments -Width 1920 -Height 1080 -Crf 24 -OutputPath 'public/hero/homepage-hero-real-16x9.mp4'
Invoke-ReelRender -Items $segments -Width 1080 -Height 1920 -Crf 25 -OutputPath 'public/hero/homepage-hero-real-9x16.mp4'

& ffmpeg -y -i 'public/hero/homepage-hero-real-16x9.mp4' -frames:v 1 -update 1 'public/hero/homepage-hero-real-16x9-poster.jpg'
if ($LASTEXITCODE -ne 0) { throw 'Failed to generate desktop poster' }
& ffmpeg -y -i 'public/hero/homepage-hero-real-9x16.mp4' -frames:v 1 -update 1 'public/hero/homepage-hero-real-9x16-poster.jpg'
if ($LASTEXITCODE -ne 0) { throw 'Failed to generate mobile poster' }

Get-ChildItem 'public/hero' | Select-Object Name,Length
