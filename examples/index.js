import domready from 'domready';
import raf from 'raf';

import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
import { PointLight } from 'three/src/lights/PointLight';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js';
import { Mesh } from 'three/src/objects/Mesh';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { Scene } from 'three/src/scenes/Scene';

import Composer from '../src/Composer';

import BoxBlurPass from '../src/passes/box-blur/BoxBlurPass';
import FXAAPass from '../src/passes/fxaa/FXAAPass';
import ZoomBlurPass from '../src/passes/zoom-blur/ZoomBlurPass';
import MultiPassBloomPass from '../src/passes/bloom/MultiPassBloomPass';
import GlitchPass from '../src/passes/glitch/GlitchPass';

let scene = null;
let camera = null;
let renderer = null;
let material = null; 
let light = null;
let cubes = [];
let composer = null;
let boxBlurPass = null;
let fxaaPass = null;
let bloomPass = null;
let glitchPass = null;

const params = {
  usePostProcessing: true,
  useFXAA: true,
  useBlur: true,
  useBloom: true,
  useGlitch: false
};

domready(() => {

  scene = new Scene();

  camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 100;

  renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x323232);
  document.body.appendChild(renderer.domElement);

  light = new PointLight(0xFFFFFF, 1);
  light.position.copy(camera.position);
  scene.add(light);

  material = new MeshPhongMaterial({color: 0x3a9ceb});

  for(var i = 0, c; i < 500; i++) {
    c = addCube();
    cubes.push(c);
    scene.add(c);
  }
  c.position.set(0, 0, 50);

  initPostprocessing();

  window.addEventListener('resize', resize);
  
  raf(animate);
});

const addCube = () =>  {
  const cube = new Mesh(new BoxGeometry(20, 20, 20), material);
  cube.position.set(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * -500
  );
  cube.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  return cube;
}

const initPostprocessing = () => {
  renderer.autoClearColor = true;
  composer = new Composer(renderer);
  fxaaPass = new FXAAPass();
  boxBlurPass = new BoxBlurPass(3, 3);
  bloomPass = new MultiPassBloomPass({
    blurAmount: 2,
    applyZoomBlur: true
  });
  glitchPass = new GlitchPass();
  return composer;
}

const resize = () =>  {
  composer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () =>  {
  raf(animate);

  for(var i = 0; i < cubes.length; i++) {
    cubes[i].rotation.y += 0.01 + ((i - cubes.length) * 0.00001);
    cubes[i].rotation.x += 0.01 + ((i - cubes.length) * 0.00001);
  }

  if(params.usePostProcessing) {
    composer.reset();
    composer.render(scene, camera);
    if(params.useFXAA) composer.pass(fxaaPass);
    if(params.useBlur) composer.pass(boxBlurPass);
    if(params.useBloom) composer.pass(bloomPass);
    if(params.useGlitch) composer.pass(glitchPass);
    composer.toScreen();
  }
  else {
    renderer.render(scene, camera);
  }
}

