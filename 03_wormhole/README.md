# 3D Spline Animation

An interactive 3D visualization featuring a dynamic camera path along a spline curve with scattered geometric elements and post-processing effects.

## Features

- Dynamic camera movement along a spline curve
- Geometric boxes with random positions and rotations
- Wireframe aesthetic with color gradients
- Bloom post-processing effect
- Orbital controls with inertia
- Fog effect for depth perception
- Responsive design

## Prerequisites

```
- Node.js
- Three.js
- Modern web browser with WebGL support
```

## Project Structure

```
project/
├── src/
│   └── spline.js         # Spline curve definition
├── js/
│   ├── OrbitControls.js
│   └── postprocessing/   # Post-processing effects
└── main.js              # Main application code
```

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install three
```

3. Run the development server:

```bash
npm run dev
```

## Usage

### Camera Controls

- Left click + drag: Rotate view
- Right click + drag: Pan
- Scroll: Zoom in/out
- The camera automatically follows a predefined path but can be manually controlled

### Customization

Key parameters that can be adjusted in the code:

- `numBoxes`: Number of geometric elements
- `bloomPass` parameters for glow effect
- Spline path definition
- Animation speed and timing

## Technical Details

- Uses Three.js for 3D rendering
- Implements EffectComposer for post-processing
- Custom spline-based camera animation
- HDR tone mapping with ACES filmic
