// import * as THREE from './three.js'
import { GLTFLoader } from "./GLTFLoader.js";

// Model Loaded variable
let modelLoaded = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// 3D model loader
const loader = new GLTFLoader();
var obj;
loader.load("../public/models/M81.gltf", function (object) {
  obj = object;
  modelLoaded = true;
});

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);

scene.add(light);
camera.position.set(0, 20, 60);
camera.lookAt(new THREE.Vector3(0, 10, 0));

function animate() {
  requestAnimationFrame(animate);
  if (modelLoaded) {
    // obj.rotation.y += 0.03;
    // obj.rotation.x += 0.01;
  }
  renderer.render(scene, camera);
}

scene.add(obj);
animate();