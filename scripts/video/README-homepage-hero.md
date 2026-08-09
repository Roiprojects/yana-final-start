# Homepage Hero Reel Build

Run:

```powershell
.\scripts\video\build-homepage-hero.ps1 -ManifestPath 'public/hero-footage/hero-reel-manifest.json'
```

Outputs:
- `public/hero/homepage-hero-real-16x9.mp4`
- `public/hero/homepage-hero-real-9x16.mp4`
- `public/hero/homepage-hero-real-16x9-poster.jpg`
- `public/hero/homepage-hero-real-9x16-poster.jpg`

Notes:
- Sources are real travel footage clips stored in `public/hero-footage/raw`.
- The sequence follows the approved arc: luxury calm, epic cinematic, fast premium energy.
- The script exports silent H.264 MP4 files with posters for web hero usage.
