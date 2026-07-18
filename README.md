# Yash Kothari Portfolio

Personal portfolio of **Yash Kothari**, Data Scientist & AI Engineer, built with Next.js.

**Live site:** https://kothariyashh.github.io/portfolio/

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/): scroll reveals, 3D tilt, magnetic buttons, layout animations
- [next-themes](https://github.com/pacocoursey/next-themes): dark/light/glass mode

## Features

- 🧠 Interactive neural-network particle canvas that reacts to the mouse
- ⌨️ Typewriter hero with rotating specialties
- 🌓 Dark/light theme with persisted preference
- 🖱️ Custom cursor with magnetic hover states
- 🎞️ Scroll-progress bar, reveal-on-scroll and staggered section animations
- 🃏 3D tilt cards, animated counters and skill bars
- 🗂️ Filterable project grid with springy layout transitions
- 📱 Fully responsive, with `prefers-reduced-motion` support

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to ./out
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static
export and publishes it to GitHub Pages.
