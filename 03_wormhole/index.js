import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";
import spline from "./spline.js";

// Configuration initiale de la scène
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.3); // Brouillard exponentiel pour l'effet de profondeur

// Configuration de la caméra
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

// Configuration du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Amélioration du rendu HDR
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Configuration des contrôles orbitaux avec effet d'inertie
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Activation de l'inertie
controls.dampingFactor = 0.03; // Force de l'inertie

// Configuration du post-processing
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(w, h),
  1.5, // Intensité
  0.4, // Rayon
  0.1 // Seuil
);
bloomPass.theshold = 0.002;
bloomPass.strength = 3.5;
bloomPass.radius = 0;

// Configuration du composeur d'effets
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Création de la géométrie du tube à partir de la spline
const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true);
const edges = new THREE.EdgesGeometry(tubeGeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffaa });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

// Génération des boîtes le long de la spline
const numBoxes = 55;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size, size, size);

for (let i = 0; i < numBoxes; i++) {
  // Création de chaque boîte avec position et rotation aléatoires
  const boxMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const box = new THREE.Mesh(boxGeo, boxMat);

  // Calcul de la position sur la spline
  const p = (i / numBoxes + Math.random() * 0.1) % 1;
  const pos = tubeGeo.parameters.path.getPointAt(p);

  // Ajout d'un décalage aléatoire
  pos.x += Math.random() - 0.4;
  pos.y += Math.random() - 0.4;
  box.position.copy(pos);

  // Rotation aléatoire
  const rote = new THREE.Vector3(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  box.rotation.set(rote.x, rote.y, rote.z);

  // Création des arêtes de la boîte avec couleur basée sur la position
  const edges = new THREE.EdgesGeometry(boxGeo, 0.2);
  const color = new THREE.Color().setHSL(1.0 - p, 1, 0.5);
  const lineMat = new THREE.LineBasicMaterial({ color: color });
  const boxLines = new THREE.LineSegments(edges, lineMat);
  boxLines.position.copy(pos);
  boxLines.rotation.set(rote.x, rote.y, rote.z);
  scene.add(boxLines);
}

// Ajout de l'éclairage
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

// Fonction de mise à jour de la caméra pour l'animation
function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000; // Durée d'un cycle complet en millisecondes
  const p = (time % looptime) / looptime;
  const pos = tubeGeo.parameters.path.getPointAt(p);
  const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

// Boucle d'animation
function animate(t) {
  requestAnimationFrame(animate);
  updateCamera(t);
  composer.render(scene, camera);
  controls.update();
}

animate();

// Gestion du redimensionnement
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
