// import * as THREE from './three.js'
import { GLTFLoader } from "./GLTFLoader.js";
import * as THREE from './three.module.js'

// Model Loaded variable
let modelLoaded = false;

const canvas = document.getElementById('model-view')
const scene = new THREE.Scene();

let mixer;

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
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, error => {
  console.log("Error");
})

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Canvas sizes
const sizes = {
  width: 500,
  height: 500
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 1, 2);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  aplha: true
});
renderer.setClearColor(0x00000000, 0);
renderer.setSize(sizes.width, sizes.height);


const clock = new THREE.Clock();

// Animation
function animate() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

