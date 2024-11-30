# Earth 3D Visualization

An interactive 3D visualization of Earth using Three.js, featuring realistic textures, cloud layers, city lights, and atmospheric effects.

## Features

- Realistic Earth representation with topographical details
- Dynamic cloud layer with transparency
- Night-time city lights
- Atmospheric glow effect
- Star field background
- Orbital controls for camera movement
- Responsive design

## Prerequisites

- Node.js
- Three.js
- Modern web browser with WebGL support

## Project Structure

```
project/
├── src/
│   ├── getFresnelMat.js
│   └── getStarfield.js
├── textures/
│   ├── 00_earthmap1k.jpg
│   ├── 01_earthbump1k.jpg
│   ├── 02_earthspec1k.jpg
│   ├── 03_earthlights1k.jpg
│   ├── 04_earthcloudmap.jpg
│   └── 05_earthcloudmaptrans.jpg
└── main.js
```

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Usage

Use mouse controls to interact with the visualization:

- Left click + drag: Rotate view
- Right click + drag: Pan
- Scroll: Zoom in/out

## Credits

Textures sourced from NASA's Visual Earth project.

## License

MIT
