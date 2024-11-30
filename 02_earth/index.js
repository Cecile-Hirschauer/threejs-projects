import { OrbitControls } from "jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { getFresnelMat } from "./src/getFresnelMat.js";
import getStarfield from "./src/getStarfield.js";

// Configuration initiale de la scène
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

// Configuration de la caméra avec un champ de vision de 75 degrés
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

// Configuration du renderer avec antialiasing pour des bords plus lisses
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Configuration du mappage de tons pour un rendu HDR réaliste
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Création du groupe principal pour la Terre et inclinaison de 23.4 degrés (axe terrestre)
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

// Ajout des contrôles orbitaux pour la navigation
new OrbitControls(camera, renderer.domElement);

// Création de la géométrie de base (icosaèdre pour une sphère optimisée)
const detail = 12; // Niveau de détail de la sphère
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);

// Création du matériau principal de la Terre avec textures
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"), // Texture de base
  specularMap: loader.load("./textures/02_earthspec1k.jpg"), // Carte de réflexion spéculaire
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"), // Carte de relief
  bumpScale: 0.04, // Intensité du relief
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Ajout des lumières nocturnes avec fusion additive
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending, // Les lumières s'ajoutent à la texture de base
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

// Ajout de la couche nuageuse avec transparence
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("./textures/05_earthcloudmaptrans.jpg"),
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003); // Légèrement plus grand que la Terre
earthGroup.add(cloudsMesh);

// Ajout de l'effet de fresnel (lueur atmosphérique)
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// Ajout du champ d'étoiles en arrière-plan
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Ajout de la lumière directionnelle (soleil)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);

  // Rotation des différentes couches
  earthMesh.rotation.y += 0.002; // Rotation de la Terre
  lightsMesh.rotation.y += 0.002; // Rotation synchronisée des lumières
  cloudsMesh.rotation.y += 0.0023; // Rotation légèrement plus rapide des nuages
  glowMesh.rotation.y += 0.002; // Rotation de l'atmosphère
  stars.rotation.y -= 0.0002; // Rotation lente du champ d'étoiles en sens inverse

  renderer.render(scene, camera);
}

animate();

// Gestion du redimensionnement de la fenêtre
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
