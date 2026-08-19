## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Session State (2026-08-04)

### Completed
- Cleaned up 78 unused files (components, shaders, HEIC photos, scripts)
- Redesigned game gallery on /hobbies page:
  - 4 featured games: Elden Ring, GTA5, Persona 5 Royal, Baldur's Gate 3
  - Cards use Steam CDN poster art (library_600x900.jpg) as background
  - Hover plays actual gameplay trailer via HLS (hls.js for Chrome/Firefox, native for Safari)
  - Click opens fullscreen VideoModal with unmuted trailer playback
  - Video elements always-mounted for instant hover playback
  - Game data in `src/data/profile.ts` — `Game` interface with `steamAppId`, `accentColor`, `trailerUrl`

### Pending: Steam API Integration
Integrate real Steam profile/game library data:

- **Need from user**: Steam Web API Key (free from https://steamcommunity.com/dev/apikey) + Steam 64-bit ID
- **Profile must be public** (game details visibility = Public)
- **Key endpoints**:
  - `GetPlayerSummaries` → nickname, avatar, online status
  - `GetOwnedGames` → full library with playtime_forever (minutes), last played timestamp
  - `GetRecentlyPlayedGames` → recent 2-week activity
- **Planned approach**: Build-time fetch → static JSON → render cards
  - API key in `.env`, not exposed to client
  - `scripts/fetch-steam.ts` to pull data and cache as JSON
  - Show playtime hours, "last played X days ago", progress bars
  - Keep 4 manual featured games + add "Steam Library" section below

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
