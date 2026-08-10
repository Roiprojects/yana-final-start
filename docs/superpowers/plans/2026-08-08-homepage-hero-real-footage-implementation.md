# Homepage Hero Real-Footage Reel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a silent 30-50 second homepage hero reel from real moving travel footage only, export both 16:9 and 9:16 versions, and wire the final assets into the Yana Travels homepage.

**Architecture:** Source real travel clips into a local footage library, define the approved luxury-to-epic-to-energy sequence in a manifest, render web-optimized desktop and mobile masters with ffmpeg, then update the homepage hero to serve the correct asset per viewport while keeping graceful fallback behavior. The implementation should preserve the existing hero component structure and replace the current slideshow-like MP4 with true moving footage.

**Tech Stack:** React 19 SPA (Vite) + React Router v7, TypeScript, public static assets, PowerShell scripting, ffmpeg, existing homepage hero component.

## Global Constraints

- Footage type: real footage only.
- Coverage: Europe, Vietnam, India, Karnataka, and additional premium global destinations.
- Duration: 30-50 seconds.
- Outputs: both 16:9 and 9:16.
- Audio: silent.
- Mood arc: luxury calm, then epic cinematic, then fast premium energy.
- Do not use still-image animations, Ken Burns effects, or AI-generated fake motion.
- Select clips that already contain natural camera movement: drone flyovers, push-ins, pans, tracking shots, water movement, street motion, skyline motion.
- Avoid cluttered shots, shaky footage, heavy text overlays, or creator watermarks.
- Keep the existing hero video support in the homepage component.
- Replace the current slideshow-like MP4 with the final real-footage hero reel.
- Preserve graceful fallback behavior if video cannot autoplay.
- The homepage should still load reliably on desktop and mobile.
- The final exports should be compressed for web delivery while keeping the footage visibly rich.

---

### Task 1: Create the real-footage source library and selection manifest

**Files:**

- Create: `public/hero-footage/raw/`
- Create: `public/hero-footage/exports/`
- Create: `public/hero-footage/posters/`
- Create: `public/hero-footage/hero-reel-manifest.json`
- Create: `docs/superpowers/reference/hero-footage-sources.md`
- Modify: `docs/superpowers/specs/2026-08-08-homepage-hero-real-footage-design.md`

**Interfaces:**

- Consumes: approved spec in `docs/superpowers/specs/2026-08-08-homepage-hero-real-footage-design.md`
- Produces: `public/hero-footage/hero-reel-manifest.json` with shape:

  ```json
  {
    "version": 1,
    "title": "Yana Travels Homepage Hero Reel",
    "durationTargetSeconds": 36,
    "desktopOutput": "/hero/homepage-hero-real-16x9.mp4",
    "mobileOutput": "/hero/homepage-hero-real-9x16.mp4",
    "posterDesktop": "/hero/homepage-hero-real-16x9-poster.jpg",
    "posterMobile": "/hero/homepage-hero-real-9x16-poster.jpg",
    "segments": [
      {
        "id": "luxury-calm-01",
        "phase": "luxury-calm",
        "src": "public/hero-footage/raw/luxury-calm-01.mp4",
        "label": "Coastline aerial",
        "location": "Europe",
        "start": 0,
        "duration": 4.5
      }
    ]
  }
  ```

- [ ] **Step 1: Create the footage library folders**

```powershell
New-Item -ItemType Directory -Force 'public/hero-footage/raw' | Out-Null
New-Item -ItemType Directory -Force 'public/hero-footage/exports' | Out-Null
New-Item -ItemType Directory -Force 'public/hero-footage/posters' | Out-Null
New-Item -ItemType Directory -Force 'docs/superpowers/reference' | Out-Null
```

- [ ] **Step 2: Gather 10-14 real footage clips and save them into `public/hero-footage/raw`**

Use real moving travel footage only. Required coverage across the chosen set:

- at least 2 Europe clips
- at least 1 Vietnam clip
- at least 2 India clips
- at least 1 Karnataka clip
- 3-6 additional premium global destination clips

Name files in order of intended use:

```text
public/hero-footage/raw/01-luxury-calm-europe-coast.mp4
public/hero-footage/raw/02-luxury-calm-resort-water.mp4
public/hero-footage/raw/03-epic-europe-landmark.mp4
public/hero-footage/raw/04-epic-vietnam-landscape.mp4
public/hero-footage/raw/05-epic-india-heritage.mp4
public/hero-footage/raw/06-epic-karnataka-highlight.mp4
public/hero-footage/raw/07-epic-global-destination.mp4
public/hero-footage/raw/08-energy-city-motion.mp4
public/hero-footage/raw/09-energy-transport-luxury.mp4
public/hero-footage/raw/10-energy-skyline-night.mp4
```

- [ ] **Step 3: Record exact clip provenance in `docs/superpowers/reference/hero-footage-sources.md`**

```markdown
# Hero Footage Sources

- `01-luxury-calm-europe-coast.mp4`
  - Source: [provider name]
  - URL: [exact source URL]
  - License/usage note: [short note]
  - Why selected: calm aerial opening with clean movement

- `06-epic-karnataka-highlight.mp4`
  - Source: [provider name]
  - URL: [exact source URL]
  - License/usage note: [short note]
  - Why selected: Karnataka coverage with strong landmark movement
```

- [ ] **Step 4: Write the reel manifest with the approved narrative arc**

```json
{
  "version": 1,
  "title": "Yana Travels Homepage Hero Reel",
  "durationTargetSeconds": 36,
  "desktopOutput": "/hero/homepage-hero-real-16x9.mp4",
  "mobileOutput": "/hero/homepage-hero-real-9x16.mp4",
  "posterDesktop": "/hero/homepage-hero-real-16x9-poster.jpg",
  "posterMobile": "/hero/homepage-hero-real-9x16-poster.jpg",
  "segments": [
    {
      "id": "luxury-calm-01",
      "phase": "luxury-calm",
      "src": "public/hero-footage/raw/01-luxury-calm-europe-coast.mp4",
      "label": "Europe coastline aerial",
      "location": "Europe",
      "start": 0,
      "duration": 4.0
    },
    {
      "id": "luxury-calm-02",
      "phase": "luxury-calm",
      "src": "public/hero-footage/raw/02-luxury-calm-resort-water.mp4",
      "label": "Luxury resort water glide",
      "location": "Global",
      "start": 0,
      "duration": 4.0
    },
    {
      "id": "epic-01",
      "phase": "epic-cinematic",
      "src": "public/hero-footage/raw/03-epic-europe-landmark.mp4",
      "label": "Europe landmark flyover",
      "location": "Europe",
      "start": 0,
      "duration": 4.0
    }
  ]
}
```

- [ ] **Step 5: Verify the raw footage library is real video, not stills**

Run:

```powershell
Get-ChildItem 'public/hero-footage/raw' | Select-Object Name,Length
```

Expected:

- Multiple `.mp4` or `.mov` files exist
- No `.jpg`, `.jpeg`, `.png`, or slideshow assets are being used as source clips

- [ ] **Step 6: Commit**

```bash
git add public/hero-footage docs/superpowers/reference docs/superpowers/specs
git commit -m "feat: add real-footage hero reel source library"
```

### Task 2: Build the reel render script for 16:9 and 9:16 exports

**Files:**

- Create: `scripts/video/build-homepage-hero.ps1`
- Create: `scripts/video/README-homepage-hero.md`
- Modify: `public/hero-footage/hero-reel-manifest.json`

**Interfaces:**

- Consumes: `public/hero-footage/hero-reel-manifest.json`
- Produces: script interface
  ```powershell
  .\scripts\video\build-homepage-hero.ps1 -ManifestPath 'public/hero-footage/hero-reel-manifest.json'
  ```
- Produces exports:
  - `public/hero/homepage-hero-real-16x9.mp4`
  - `public/hero/homepage-hero-real-9x16.mp4`
  - `public/hero/homepage-hero-real-16x9-poster.jpg`
  - `public/hero/homepage-hero-real-9x16-poster.jpg`

- [ ] **Step 1: Write a failing smoke check for the missing render script**

Run:

```powershell
Test-Path 'scripts/video/build-homepage-hero.ps1'
```

Expected: `False`

- [ ] **Step 2: Create the render script with manifest parsing and ffmpeg guards**

```powershell
param(
  [string]$ManifestPath = 'public/hero-footage/hero-reel-manifest.json'
)

$ErrorActionPreference = 'Stop'
if (-not (Test-Path $ManifestPath)) { throw "Missing manifest: $ManifestPath" }
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { throw 'ffmpeg not found on PATH' }
if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) { throw 'ffprobe not found on PATH' }

$manifest = Get-Content $ManifestPath -Raw | ConvertFrom-Json
$segments = $manifest.segments
if (-not $segments -or $segments.Count -lt 8) { throw 'Expected at least 8 real footage segments' }
```

- [ ] **Step 3: Implement the desktop render path**

Use ffmpeg trim, scale, and concat flow against manifest segments. Target a rich but web-safe 16:9 export.

```powershell
$desktopOutput = 'public/hero/homepage-hero-real-16x9.mp4'
$desktopFilter = 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,format=yuv420p'
ffmpeg -y [desktop-inputs] -filter_complex [desktop-filter-graph] -an -c:v libx264 -preset medium -crf 22 -movflags +faststart $desktopOutput
```

- [ ] **Step 4: Implement the mobile render path**

Use the same segment order with center-weighted reframing for a 9:16 crop.

```powershell
$mobileOutput = 'public/hero/homepage-hero-real-9x16.mp4'
$mobileFilter = 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p'
ffmpeg -y [mobile-inputs] -filter_complex [mobile-filter-graph] -an -c:v libx264 -preset medium -crf 23 -movflags +faststart $mobileOutput
```

- [ ] **Step 5: Generate posters for both outputs**

```powershell
ffmpeg -y -i 'public/hero/homepage-hero-real-16x9.mp4' -frames:v 1 -update 1 'public/hero/homepage-hero-real-16x9-poster.jpg'
ffmpeg -y -i 'public/hero/homepage-hero-real-9x16.mp4' -frames:v 1 -update 1 'public/hero/homepage-hero-real-9x16-poster.jpg'
```

- [ ] **Step 6: Document how to rebuild the reel**

````markdown
# Homepage Hero Reel Build

Run:

```powershell
.\scripts\video\build-homepage-hero.ps1 -ManifestPath 'public/hero-footage/hero-reel-manifest.json'
```
````

Outputs:

- `public/hero/homepage-hero-real-16x9.mp4`
- `public/hero/homepage-hero-real-9x16.mp4`
- `public/hero/homepage-hero-real-16x9-poster.jpg`
- `public/hero/homepage-hero-real-9x16-poster.jpg`

````

- [ ] **Step 7: Run the render script and verify both outputs exist**

Run:
```powershell
.\scripts\video\build-homepage-hero.ps1 -ManifestPath 'public/hero-footage/hero-reel-manifest.json'
Get-ChildItem 'public/hero' | Select-Object Name,Length
````

Expected:

- both `.mp4` files exist
- both poster `.jpg` files exist
- exported sizes look plausible for 30-50 second H.264 files

- [ ] **Step 8: Commit**

```bash
git add scripts/video public/hero public/hero-footage
git commit -m "feat: add homepage hero reel build pipeline"
```

### Task 3: Integrate responsive desktop and mobile hero video playback

**Files:**

- Modify: `src/components/marketing/hero-slideshow.tsx`
- Modify: `src/pages/home.tsx`
- Modify: `public/hero-footage/hero-reel-manifest.json`

**Interfaces:**

- Consumes: final hero assets in `public/hero/`
- Produces component interface:

  ```ts
  type HeroSlideshowProps = {
    images: string[];
    interval?: number;
    videoSrc?: string;
    mobileVideoSrc?: string;
    poster?: string;
    mobilePoster?: string;
  };
  ```

- [ ] **Step 1: Write the failing component expectation**

The current component only supports a single `videoSrc`. Add a viewport-aware mobile source requirement before editing.

```tsx
<HeroSlideshow
  videoSrc="/hero/homepage-hero-real-16x9.mp4"
  mobileVideoSrc="/hero/homepage-hero-real-9x16.mp4"
  poster="/hero/homepage-hero-real-16x9-poster.jpg"
  mobilePoster="/hero/homepage-hero-real-9x16-poster.jpg"
  images={fallbackImages}
/>
```

- [ ] **Step 2: Extend the hero component to support responsive sources**

```tsx
<video className="hidden md:block absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={poster}>
  <source src={videoSrc} type="video/mp4" />
</video>
<video className="md:hidden absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={mobilePoster ?? poster}>
  <source src={mobileVideoSrc ?? videoSrc} type="video/mp4" />
</video>
```

- [ ] **Step 3: Keep the existing slideshow fallback path intact**

```tsx
if (!videoSrc && images.length > 0) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {images.map((src, i) => (
        <div key={src} className="absolute inset-0 bg-cover bg-center" />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Wire the homepage hero to the real-footage assets**

```tsx
<HeroSlideshow
  videoSrc="/hero/homepage-hero-real-16x9.mp4"
  mobileVideoSrc="/hero/homepage-hero-real-9x16.mp4"
  poster="/hero/homepage-hero-real-16x9-poster.jpg"
  mobilePoster="/hero/homepage-hero-real-9x16-poster.jpg"
  images={[
    unsplash(heroImage, 2000),
    unsplash(collections[0].image, 2000),
    unsplash(collections[3].image, 2000),
  ]}
/>
```

- [ ] **Step 5: Verify the homepage references the new real-footage assets**

Run:

```powershell
Select-String -Path 'src\components\marketing\hero-slideshow.tsx','src\pages\home.tsx' -Pattern 'homepage-hero-real-16x9','homepage-hero-real-9x16','mobileVideoSrc','mobilePoster'
```

Expected:

- desktop and mobile hero asset names are present
- the mobile-specific props are used

- [ ] **Step 6: Commit**

```bash
git add src/components/marketing/hero-slideshow.tsx src/pages/home.tsx public/hero-footage/hero-reel-manifest.json
git commit -m "feat: serve responsive real-footage hero reels"
```

### Task 4: Verify quality, performance, and production build

**Files:**

- Modify: `docs/superpowers/reference/hero-footage-sources.md`
- Modify: `scripts/video/README-homepage-hero.md`
- Modify: `public/hero-footage/hero-reel-manifest.json`

**Interfaces:**

- Consumes: built assets and integrated homepage references
- Produces: verified deliverables list
  - desktop reel present
  - mobile reel present
  - posters present
  - typecheck passes
  - production build passes

- [ ] **Step 1: Confirm both reel durations are within the approved range**

Run:

```powershell
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 'public/hero/homepage-hero-real-16x9.mp4'
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 'public/hero/homepage-hero-real-9x16.mp4'
```

Expected:

- both durations are between `30` and `50` seconds

- [ ] **Step 2: Confirm both outputs are silent**

Run:

```powershell
ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 'public/hero/homepage-hero-real-16x9.mp4'
ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 'public/hero/homepage-hero-real-9x16.mp4'
```

Expected:

- no audio stream is returned for either file

- [ ] **Step 3: Run typecheck**

Run:

```powershell
npm run typecheck
```

Expected: PASS with exit code `0`

- [ ] **Step 4: Run production build**

Run:

```powershell
npm run build
```

Expected: PASS with exit code `0`

- [ ] **Step 5: Record any output-size adjustments if the files are too heavy**

If either reel is too large for smooth homepage autoplay, tune the render settings and document the final values:

```text
Desktop final: libx264, crf 22, 1920x1080, 30 fps
Mobile final: libx264, crf 23, 1080x1920, 30 fps
```

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/reference scripts/video public/hero public/hero-footage
git commit -m "chore: verify homepage hero reel outputs"
```

## Self-Review

- Spec coverage check:
  - real footage only: covered by Task 1 source library requirements and Task 4 manual verification
  - Europe, Vietnam, India, Karnataka, plus more destinations: covered by Task 1 clip requirements and manifest
  - 30-50 second duration: covered by Task 1 manifest target and Task 4 ffprobe verification
  - 16:9 and 9:16 outputs: covered by Task 2 exports and Task 3 integration
  - silent output: covered by Task 2 render flags and Task 4 audio verification
  - luxury calm to epic to fast premium energy arc: covered by Task 1 manifest structure
  - homepage integration with fallback: covered by Task 3
  - web performance and compression: covered by Task 2 render settings and Task 4 tuning step
- Placeholder scan: no `TODO`, `TBD`, or undefined references remain.
- Type consistency: `videoSrc`, `mobileVideoSrc`, `poster`, and `mobilePoster` are defined in Task 3 and used consistently.
