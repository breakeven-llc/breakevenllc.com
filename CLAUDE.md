# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 static website for Breakeven LLC featuring an interactive terminal interface with podcast functionality. The site is deployed to GitHub Pages at breakevenllc.com.

## Essential Commands

```bash
# Development
npm run dev        # Start development server on localhost:3000
npm run build      # Build static site (outputs to ./out)
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking

# Testing changes
npm run build && npx serve out  # Test production build locally
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router and static export (`output: 'export'`)
- **React 19** with TypeScript
- **Tailwind CSS** with custom neon theme and animations
- **XTerm.js** for terminal emulation
- **MDX** for blog content

### Key Components

1. **Terminal Interface** (`app/components/Terminal.tsx`)
   - Interactive xterm.js terminal with custom commands
   - Built-in podcast player (audio file: `public/podcast.m4a`)
   - Commands: help, clear, date, echo, podcast (play/pause/stop)

2. **Blog System**
   - Content in `content/blog/*.md` with frontmatter (title, date, excerpt)
   - Processed by `lib/blog.ts`
   - Rendered on `/blog` page

3. **Deployment**
   - GitHub Actions workflow (`.github/workflows/pages.yml`)
   - Deploys to GitHub Pages on push to main
   - Custom domain via `public/CNAME`

### Design System

CSS variables in `app/globals.css`:
- Neon color palette with glow effects
- Custom animations: glow, pulse, gradient, float
- Dark theme optimized
- Geist fonts (sans & mono)

### Project Structure

```
app/
├── components/      # Shared components (Terminal)
├── (routes)/       # Page routes
├── layout.tsx      # Root layout with navigation
└── globals.css     # Global styles and CSS variables

content/blog/       # Blog posts in Markdown
lib/                # Utilities (blog processing)
public/             # Static assets (CNAME, podcast.m4a)
```

## Development Guidelines

1. **Static Export Requirements**
   - No dynamic routes or server-side features
   - All pages must be statically generatable
   - Images: `unoptimized: true` in next.config.mjs

2. **Terminal Component**
   - Handle mounting delays (container dimensions)
   - Preserve command history in state
   - Audio element management for podcast feature

3. **Blog Posts**
   - Must include frontmatter: title, date, excerpt
   - Filename becomes URL slug
   - MDX supported for interactive content

4. **Styling**
   - Use Tailwind utilities
   - Custom animations defined in tailwind.config.js
   - Maintain neon/glow aesthetic