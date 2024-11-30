# Geometric-Shapes

This code creates an interactive 3D scene using Three.js, featuring an icosahedron with wireframe overlay and orbital controls.

## Setup and Initialization

### Renderer Setup

```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

The renderer is initialized with antialiasing enabled and sized to fit the window. It creates a canvas element that is added to the document body.

### Camera Configuration

```javascript
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10
);
camera.position.z = 2;
```

- Field of View (FOV): 75 degrees
- Aspect Ratio: Matches window dimensions
- Near Plane: 0.1 units
- Far Plane: 10 units
- Camera Position: 2 units along the z-axis

### Scene Creation

```javascript
const scene = new THREE.Scene();
```

Creates an empty 3D scene to hold all objects.

## Controls

```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
```

Implements orbital controls allowing users to:

- Rotate the view around the object
- Zoom in/out
- Pan the camera
- Smooth camera movement (damping enabled)

## Geometry and Materials

### Main Mesh

```javascript
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
```

- Creates an icosahedron with radius 1.0 and detail level 2
- Uses MeshStandardMaterial for physically-based rendering
- White color with flat shading for a faceted look

### Wireframe Overlay

```javascript
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);
```

- Creates a slightly larger wireframe mesh
- Added as a child of the main mesh
- Uses basic material for wire rendering

## Lighting

```javascript
const hemilight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemilight);
```

Adds hemisphere lighting with:

- Sky Color: Light blue (0x0099ff)
- Ground Color: Orange-brown (0xaa5500)

## Animation Loop

```javascript
function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}
```

The animation loop:

1. Uses requestAnimationFrame for smooth animation
2. Rotates the mesh slowly around its y-axis
3. Updates the orbital controls
4. Renders the scene

## Usage Notes

- The scene automatically adjusts to window size
- Users can interact with the scene using:
  - Left mouse button: Rotate
  - Right mouse button: Pan
  - Mouse wheel: Zoom
- The object continuously rotates while allowing user interaction
