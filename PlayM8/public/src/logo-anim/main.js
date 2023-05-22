// import * as THREE from './three.js'
import { GLTFLoader } from "./GLTFLoader.js";
import * as THREE from './three.module.js'

// Model Loaded variable
let modelLoaded = false;

const canvas = document.getElementById('model-view')
const scene = new THREE.Scene();

let mixer;

/* const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 'red'
})
const boxMesh = new THREE.Mesh(box, material)
scene.add(boxMesh) */

// Loader
const loader = new GLTFLoader()
loader.load('../../../public/models/M81.glb', glb => {
  const model = glb.scene;
  model.scale.set(0.10, 0.10, 0.10);
  scene.add(model);
  mixer = new THREE.AnimationMixer(model);
  const clips = glb.animations;
  clips.forEach(clip => {
    const action = mixer.clipAction(clip);
    action.play();
  });

  animate();

}, xhr => {
  // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, error => {
  console.log("Error");
})

// Light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 2, 5);
scene.add(light);

// Canvas sizes
const sizes = {
  width: 500,
  height: 500
}

// Camera
const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 1, 2);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height);
renderer.gamaOutput = true
renderer.shadowMap.enabled = true


const clock = new THREE.Clock();

// Animation
function animate() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
