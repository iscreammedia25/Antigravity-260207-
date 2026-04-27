# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

No test suite is configured.

## Project Overview

Children's interactive reading learning platform — kiosk-style tablet app (16:9 aspect ratio, 1024×768 frame) built with **Next.js 14 App Router**, **React 18**, and **Tailwind CSS**. The UI simulates a physical tablet bezel with glassmorphism modals and custom animations.

## Architecture

```
src/
  app/
    page.tsx       # Root view — owns all top-level state and view routing
    layout.tsx     # Tablet bezel shell, Google Fonts (Fredoka, Jua), dark radial bg
  components/      # Feature-level components, each ~200-600 lines
  types/
    learning.ts    # ReadingHistory, LearningPhase, BookMetadata
    media.ts       # MediaItem (greeting videos, audiobooks, movie books)
  data/
    books.ts       # Static book catalog (lexile, word count, categories, cover paths)
    mockData.ts    # Per-book scene data: scripts + image paths
  utils/
    storage.ts     # localStorage helpers for reading history
    elevenlabs.ts  # TTS via ElevenLabs API (key stored in localStorage at runtime)
    googleDrive.ts # Converts Google Drive share links → direct image URLs
public/
  Image/Cover, Image/Book   # Book artwork
  Video/Book/Intro          # Greeting/intro videos
  Word/                     # Vocabulary card assets
  Audio/                    # Audio files
```

### View Routing

`page.tsx` holds a single `view` state (`home | word | read | library | my-library`) and conditionally renders components. There is no router-based navigation — all transitions are in-memory state changes.

### Learning Flow

Each book has four sequential learning phases: **word → read → quiz → speak**. Progress is stored in `ReadingHistory` (via `src/utils/storage.ts` → localStorage). Book cards on the roadmap render as locked, active/next-target, or completed based on this history.

### Key Components

| Component | Role |
|---|---|
| `HeroSection` | Hero carousel showing current/recent books |
| `LibrarySection` | Book grid with category filtering |
| `ReadSection` | Scene-by-scene reading with difficulty selector (Easy / Original / Difficult) and font-size control |
| `WordSection` | Flashcard vocabulary builder |
| `MyLibrarySection` | Personal bookshelf of bookmarked books |
| `UnifiedPlayer` | Shared media player for video and audio |
| `OrientationWarning` | Detected landscape/portrait orientation mismatch overlay |

### State Patterns

- All state is local React (`useState`, `useRef`, `useEffect`) — no global store.
- `page.tsx` passes callbacks down; components do not navigate themselves.
- Demo mode in `page.tsx` seeds mock reading history for UI testing without real user data.

### Styling Conventions

- Tailwind CSS exclusively; no separate stylesheets.
- Custom Tailwind animations defined in `tailwind.config.ts`: `card-float`, `suck-to-hero`, `flash-yellow`.
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`).
- `clsx` + `tailwind-merge` for conditional class composition.

### External Integrations

- **ElevenLabs TTS** — narration audio. API key is entered by the user at runtime and saved to localStorage; it is never bundled in source.
- **Google Drive** — book scene images may be hosted on Drive; `googleDrive.ts` rewrites share URLs to direct embed URLs.
