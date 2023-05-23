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
  model.scale.set(0.11, 0.11, 0.11);
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
  width: window.innerWidth / 2,
  height: window.innerWidth / 2,
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

// Resposive
window.addEventListener('resize', () => {
  console.log('res');
  // update display width and height
  const width = window.innerWidth / 2
  const height = window.innerHeight / 2
  // update camera aspect
  if (window.innerWidth > 500) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    // update renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)
  }
})
