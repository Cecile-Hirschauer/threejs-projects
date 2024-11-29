import { OrbitControls } from "jsm/controls/OrbitControls.js";
import * as THREE from "three";

// define screen size
const w = window.innerWidth;
const h = window.innerHeight;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Create camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // near and far are used for perspective camera only
camera.position.z = 2;

// Create scene
const scene = new THREE.Scene();

// Create controls
const controls = new OrbitControls(camera, renderer.domElement); // controls are used for orbit camera
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2); // radius, detail
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
}); // color, flatShading
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xaa5500); // sky color, ground color
scene.add(hemilight);

function animate(t = 0) {
  requestAnimationFrame(animate); // requestAnimationFrame is called to animate the scene
  // mesh.scale.setScalar(Math.cos(t * 0.001) + 1);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
