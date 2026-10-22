# VectorForge

**VectorForge** is an offline-first, browser-based SVG divider and mesh gradient factory for developers. It runs entirely in the browser with no build step, no server, and no npm installation.

Design rich aurora-style mesh gradients, sculpt wave dividers, drag color control points, switch between polished presets, and export production-ready SVG, Tailwind markup, or inline CSS in one click.

![VectorForge preview](https://img.shields.io/badge/status-production--ready-8b5cf6?style=for-the-badge)
![Offline first](https://img.shields.io/badge/offline-first-22d3ee?style=for-the-badge)
![Single file](https://img.shields.io/badge/single-file-html-5eead4?style=for-the-badge)

## Features

- **Live workspace canvas** with an adjustable SVG artboard and multiple aspect ratios.
- **SVG wave and divider generator** with frequency, amplitude, layers, curve smoothness, opacity, tint, and top/bottom blend toggles.
- **Complex mesh gradient engine** with draggable color control points, color picking, influence sizing, add/remove actions, and keyboard nudging.
- **Real-time export panel** for raw SVG, Tailwind utility markup, and inline CSS, each with copy-to-clipboard support.
- **Six curated presets** including Sleek Aurora, Ocean Waves, Tech Grid Mesh, Sunset Dunes, Neon Horizon, and Mint Glass.
- **Local persistence** using browser storage, so compositions survive reloads.
- **Responsive interface** with desktop, tablet, and mobile layouts.

## Quick Start

1. Open `index.html` in any modern browser.
2. Choose a preset or start from the default composition.
3. Drag control points, tune wave settings, and adjust colors.
4. Open the **Export** tab and copy the format you need.

No installation is required. Tailwind is loaded from its CDN, and all application logic lives in `app.js`.

## Project Structure

```text
VectorForge/
├── index.html      # Application shell and UI structure
├── styles.css      # Design system, layout, responsive styles
├── app.js          # State, rendering, interactions, exports
└── README.md       # Project documentation
```

## Controls

| Action | How |
|---|---|
| Move a control point | Drag it on the canvas |
| Add a control point | Double-click the canvas or use **Add point** |
| Nudge a point | Focus a point and use arrow keys |
| Remove a point | Select it, then click the trash icon |
| Change aspect ratio | Use the frame buttons in the toolbar |
| Copy export code | Open **Export** and click any **Copy** button |

## Export Formats

- **Raw SVG** — Complete vector artwork with gradients, blur, vignette, and wave paths.
- **Tailwind utility markup** — A drop-in section using Tailwind classes plus an inline mesh background.
- **Inline CSS** — A framework-free element with all styles written inline.

All generated code is self-contained and can be pasted directly into another project.

## Browser Support

VectorForge works in current versions of Chrome, Edge, Firefox, and Safari. Clipboard access may require a secure context; a fallback copy method is included.

## Offline-First

VectorForge does not send data to a server. Compositions are stored locally in the browser, and exports are generated on demand.

## License

MIT
