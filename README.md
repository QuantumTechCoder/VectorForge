# VectorForge

[![Live Demo](https://img.shields.io/badge/Live%20Demo-meshvectorforge.pages.dev-22d3ee?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://meshvectorforge.pages.dev)
[![Source Code](https://img.shields.io/badge/Source%20Code-GitHub-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/QuantumTechCoder/VectorForge)
[![Offline First](https://img.shields.io/badge/Offline-First-5eead4?style=for-the-badge)](https://github.com/QuantumTechCoder/VectorForge)
[![License: MIT](https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge)](LICENSE)

> A browser-based SVG divider and mesh gradient factory for developers.  
> No build step. No server. No npm. Just open and create.

VectorForge lets you design rich mesh gradients, sculpt wave dividers, drag color control points, switch between polished presets, and export production-ready **SVG**, **Tailwind markup**, or **inline CSS** in one click.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Controls](#controls)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Export Formats](#export-formats)
- [Composition JSON](#composition-json)
- [Browser Support](#browser-support)
- [Offline-First](#offline-first)
- [Contributing](#contributing)
- [License](#license)

## Live Demo

Launch VectorForge instantly:

**https://meshvectorforge.pages.dev**

## Source Code

The complete source code is available here:

**https://github.com/QuantumTechCoder/VectorForge**

## Features

### Visual Engine

- Live SVG workspace with adjustable aspect ratios: `16:9`, `4:3`, `1:1`, `3:2`, and `21:9`
- Mesh gradient engine with draggable color control points
- Smooth color blending with vignette, blur, and layered gradients
- Wave divider generator with frequency, amplitude, layers, opacity, tint, and smoothness
- Top and bottom section blending toggles
- Snap-to-grid editing for precise point placement
- Mesh softness control for subtle or dramatic blends
- Six curated presets: **Sleek Aurora**, **Ocean Waves**, **Tech Grid Mesh**, **Sunset Dunes**, **Neon Horizon**, and **Mint Glass**

### Editing Workflow

- Add, duplicate, remove, and randomize control points
- Randomize entire mesh color palettes
- Undo and redo with keyboard support
- Local persistence using browser storage
- Responsive desktop, tablet, and mobile layouts

### Export

- Raw SVG with gradients, filters, vignette, and wave paths
- Tailwind utility markup with arbitrary aspect ratio
- Inline CSS with framework-free markup
- SVG data URI export
- Composition JSON import and export
- Copy-to-clipboard support for every format

## Quick Start

### Use the website

Open the live app:

```text
https://meshvectorforge.pages.dev
```

### Run locally

1. Clone the repository:

```bash
git clone https://github.com/QuantumTechCoder/VectorForge.git
cd VectorForge
```

2. Open `index.html` in any modern browser.

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
| Duplicate a point | Select it, then click **Duplicate** |
| Remove a point | Select it, then click the trash icon |
| Randomize colors | Click **Randomize colors** |
| Nudge a point | Focus a point and use arrow keys |
| Change aspect ratio | Use the frame buttons in the toolbar |
| Copy export code | Open **Export** and click any **Copy** button |
| Import a composition | Open **Export** and click **Import JSON** |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` or `Ctrl/Cmd + Y` | Redo |
| `Arrow Keys` | Nudge selected point by 1% |
| `Shift + Arrow Keys` | Nudge selected point by 5% |
| `Delete` or `Backspace` | Remove selected point |

## Export Formats

### Raw SVG

Complete vector artwork with mesh gradients, blur, vignette, and wave paths.

### Tailwind Utility Markup

A drop-in section using Tailwind classes plus an inline mesh background.

### Inline CSS

A framework-free element with all styles written inline.

### SVG Data URI

A copy-ready `data:image/svg+xml` URI for embedding anywhere.

All generated code is self-contained and can be pasted directly into another project.

## Composition JSON

VectorForge can export and import full compositions as JSON, including:

- Canvas ratio and background color
- Mesh control points, colors, positions, and influence
- Wave frequency, amplitude, layers, smoothness, opacity, tint, and blend toggles
- Snap and softness settings

This makes it easy to version, share, or restore exact designs.

## Browser Support

VectorForge works in current versions of Chrome, Edge, Firefox, and Safari. Clipboard access may require a secure context; a fallback copy method is included.

## Offline-First

VectorForge does not send data to a server. Compositions are stored locally in the browser, and exports are generated on demand.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request.


## Disclosure

Minor parts of this project have been created with assistance of AI. All the core logic, mechanism, and visual design/creative design/ UI-UX have been made by humans. AI assistance has only been used for optimizing the app.js, and for adding comments in the code for better readability.

## License

MIT
