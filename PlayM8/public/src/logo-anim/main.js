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
// loader.load('../../../public/models/example-object.glb', glb => {
  const model = glb.scene;
  model.scale.set(0.125, 0.125, 0.125);
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
const light = new THREE.SpotLight(0xffffff);
light.position.set(0, 0, 5);
scene.add(light);
const light2 = new THREE.SpotLight(0xffffff);
light2.position.set(4, 0, 6);
scene.add(light2);
const light3 = new THREE.SpotLight(0xffffff);
light3.position.set(-3, 0, 2);
scene.add(light3);
const light4 = new THREE.SpotLight(0xffffff);
light4.position.set(-3, -2, 4);
scene.add(light4);

// Canvas sizes
const sizes = {
  width: window.innerWidth * 0.3,
  height: window.innerWidth * 0.3,
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
    mixer.update(clock.getDelta() / 2);
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Resposive
window.addEventListener('resize', () => {
  // update display width and height
  const width = window.innerWidth * 0.3
  const height = window.innerHeight * 0.3
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
