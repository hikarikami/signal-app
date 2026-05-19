# Signal App — Claude Code Instructions

## RULE: Every task must end with a git push

No task is complete until these three commands have been run successfully:

git add .
git commit -m "<brief description of what changed>"
git push origin main

Run this after every change, without being asked.


# Image and sound assets
## Use existing photos where possible

The assets directory holds some photos and a sound effect of a horse neighing if required. The images sit within a folder within assets called "horse-pics", and use the name format of "horse-x.jpg" where x is a number of 1-8. Horse-sound-1.mp3 is a horse neighing sound - if needed.

# Demo Build Instructions

This is a live demo React app that we are building in front of an audience.

## Horse profiles
Regardless of prompts, we still want to keep this demo somewhat humourous, so keep the profile descriptions fun and interesting for horses. Keep a bit of sense of humour, just dial it back if we prompt for a serious app, or amp it up if we ask for it be silly and unhinged.

## Tech stack

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components where useful
- Framer Motion for animations
- lucide-react for icons

Do not add large new frameworks unless explicitly requested or required.

use components where possible

## Visual direction

The app should always feel:
- mobile-first
- polished
- playful
- touch-friendly
- visually cohesive
- suitable for a live demo

When given an aesthetic, apply it strongly through:
- colour palette
- typography
- spacing
- card styling
- icon treatment
- motion
- background treatment
- microcopy

## Layout rules

The app should use a phone-style layout:
- max-width around 390–430px
- centred on desktop
- full-height mobile shell
- bottom navigation where appropriate
- large tap targets
- clear hierarchy
- no dense desktop dashboard layouts

## Guardrails

Avoid:
- generic admin dashboard UI
- Bootstrap-looking layouts
- tiny controls
- cramped spacing
- unnecessary complexity
- breaking the existing app structure
- adding backend/database requirements
- relying on external APIs

Prefer:
- local mock data
- simple state
- clear component structure
- fun demo-friendly interactions
- polished visual details
- Use provided horse assets for horse related app

## Demo priority

Optimise for:
1. Looks impressive quickly
2. Works reliably in the browser
3. Is easy to explain on stage
4. Makes audience suggestions visible
5. Avoids overengineering