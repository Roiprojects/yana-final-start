# Homepage Hero Travel Montage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a silent 30 to 50 second homepage hero video montage using real tourist-attraction imagery from Europe, Vietnam, India, Karnataka, and a few additional destinations.

**Architecture:** Source royalty-permitted real-place still imagery, assemble a local MP4 montage with ffmpeg using timed pans and crossfades, then swap the homepage hero from slideshow backgrounds to a video-first hero with safe fallback behavior. Keep the asset in `public` so Next can serve it directly.

**Tech Stack:** Next.js App Router, React, local `ffmpeg`, static assets in `public`

## Global Constraints

- Video must be silent.
- Video must be suitable for the homepage hero section.
- Visuals must focus on tourist-attractive places only.
- Keep the hero bright and premium, with no heavy dark image shading.
- Preserve a clean fallback if the video cannot autoplay.

---
