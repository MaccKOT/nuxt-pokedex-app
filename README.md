# Nuxt Pokedex

A minimal Pokédex web app: browse the first 150 Pokémon, search by name,
and view details (types, height, weight). Server-rendered with Nuxt 4.

This project is a modern rewrite of the original SvelteKit Pokédex,
rebuilt on the current frontend stack.

## Original project

- Rewrite source: [MaccKOT/sveltekit-pokedex-app](https://github.com/MaccKOT/sveltekit-pokedex-app)
- Based on the tutorial by James Q Quick: [jamesqquick/svelte-kit-pokedex](https://github.com/jamesqquick/svelte-kit-pokedex)

## Stack

- **Nuxt 4** — SSR, file-based routing, auto-imports
- **Bun** — package manager and runtime
- **Tailwind CSS v4** — CSS-first config with semantic design tokens
- **TypeScript** — typed API responses end to end
- **Nitro** — server proxy with edge-ready `bun` preset

## Features

- Server-side rendered Pokémon list and detail pages
- Client-side search with no extra dependencies
- Automatic dark mode via `prefers-color-scheme`
- Loading skeletons and a themed 404/500 error page
- Server route proxying PokeAPI with response caching

## Getting started

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
bun run preview
```

## Preview

Open `http://localhost:3000` in your browser to preview the production build.
