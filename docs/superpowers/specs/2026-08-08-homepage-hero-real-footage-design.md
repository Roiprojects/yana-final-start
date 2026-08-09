# Homepage Hero Real-Footage Reel Design

Date: 2026-08-08

## Goal
Replace the current slideshow-style hero background with a proper cinematic travel reel made from real moving footage only.

## Approved Direction
- Footage type: real footage only
- Coverage: Europe, Vietnam, India, Karnataka, and additional premium global destinations
- Duration: 30-50 seconds
- Outputs: both 16:9 and 9:16
- Audio: silent
- Mood arc:
  1. Luxury calm
  2. Epic cinematic
  3. Fast premium energy

## Creative Structure
The reel will be built as a paced progression instead of a flat montage.

### 1. Luxury calm
Open with elegant drone or glide footage such as coastlines, premium resorts, mountain approaches, sunrise water movement, or quiet luxury arrivals.

### 2. Epic cinematic
Move into larger landmark and destination reveals with stronger scale: Europe city icons, Vietnam landscapes, India heritage locations, Karnataka highlights, and additional world destinations that feel aspirational.

### 3. Fast premium energy
End with tighter rhythm, more movement, transport, skyline, and premium-travel momentum while still staying polished enough for a homepage background.

## Asset Strategy
- Prefer real stock footage or otherwise usable real travel clips.
- Do not use still-image animations, Ken Burns effects, or AI-generated fake motion.
- Select clips that already contain natural camera movement: drone flyovers, push-ins, pans, tracking shots, water movement, street motion, skyline motion.
- Avoid cluttered shots, shaky footage, heavy text overlays, or creator watermarks.

## Editing Approach
- Build one master sequence from real clips.
- Export two final versions:
  - desktop hero: 16:9
  - mobile hero: 9:16
- Use reframing rather than separate storytelling so both outputs stay visually consistent.
- Keep the reel silent.
- Prioritize smooth cut flow and premium pacing over stuffing in too many destinations.

## Homepage Integration
- Keep the existing hero video support in the homepage component.
- Replace the current slideshow-like MP4 with the final real-footage hero reel.
- Use an optimized poster image for each version if needed.
- Preserve graceful fallback behavior if video cannot autoplay.

## Performance Constraints
- The homepage should still load reliably on desktop and mobile.
- The final exports should be compressed for web delivery while keeping the footage visibly rich.
- If the full 30-50 second reel is too heavy for direct homepage use, create:
  - a homepage-optimized version for autoplay
  - a higher-bitrate master version for reuse elsewhere

## Verification
- Verify both aspect-ratio exports exist.
- Verify the homepage references the intended hero asset(s).
- Run typecheck and production build after integration.
- Manually confirm the result is actual moving footage, not image-based faux motion.
