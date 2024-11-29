import * as THREE from "three";

// define screen size
const w = window.innerWidth;
const h = window.innerHeight;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
