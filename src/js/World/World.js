import { Color } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { sphere } from './components/meshes/sphere.js';
import { cube } from "./components/meshes/cube";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';
import { roomComposition } from './components/compositions/roomComposition.js';
import { createWalls } from './components/meshes/walls.js'
import { defaultColor } from "./components/materials/defaultColor.js";
import { frostedPlastic } from "./components/materials/frostedPlastic.js";

const hdrURL = new URL('/assets/hdr/studio_small_08_2k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    const vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(vrControls);
    this.floorSize = 12;
    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.a6');
    this.physics = new AmmoPhysics(this.scene);
    // physics.debug.enable(true);
    this.loop.setPhysics(this.physics);
    const room = roomComposition(this.physics, this.floorSize, false);
    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.b5');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);
    this.walls = createWalls(this.scene, this.floorSize, envmap);
    const spreadWidth = 10;

    // M1 - blue

    const hue1 = 0.6;
    const s1 = 1;
    const l1 = 0.5;
    const color1 = new Color();
    color1.setHSL(hue1, s1, l1);

    const defaultColorMaterial1 = defaultColor(color1, envmap);

    for (let i = 0; i < 8; i++) {
      const cubeItem = cube(defaultColorMaterial1, Math.random() * 1 + 0.2, Math.random() * 1.4 + 0.2, Math.random() * 1 + 0.2);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
    }

    // M2 - white

    const hue2 = 0.6;
    const s2 = 1;
    const l2 = 1;
    const color2 = new Color();
    color2.setHSL(hue2, s2, l2);

    const defaultColorMaterial2 = defaultColor(color2, envmap);

    for (let i = 0; i < 8; i++) {
      const cubeItem = cube(defaultColorMaterial2, 0.5, 1, 0.5);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
    }

    // M3 - black

    const hue3 = 0;
    const s3 = 0;
    const l3 = 0.1;
    const color3 = new Color();
    color3.setHSL(hue3, s3, l3);

    const defaultColorMaterial3 = defaultColor(color3, envmap);

    for (let i = 0; i < 8; i++) {
      const cubeItem = cube(defaultColorMaterial3, Math.random() * 1 + 0.2, Math.random() * 1.4 + 0.2, Math.random() * 1 + 0.2);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
    }

    // M4 - frosted

    const hue4 = 0.6;
    const s4 = 1;
    const l4 = 1;
    const color4 = new Color();
    color4.setHSL(hue4, s4, l4);

    const frostedPlasticMaterial = frostedPlastic(color4, envmap);

    for (let i = 0; i < 12; i++) {
      const cubeItem = cube(frostedPlasticMaterial, 1, 1, 0.5);
      cubeItem.castShadow = true;
      cubeItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.position.y = Math.random() + 2;
      cubeItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      cubeItem.rotation.x = Math.random();
      cubeItem.rotation.y = Math.random();
      cubeItem.rotation.z = Math.random();
      this.scene.add(cubeItem);
      this.physics.add.existing(cubeItem);
    }

    // M5

    const hue5 = 0.7;
    const s5 = 1;
    const l5 = 0.5;
    const color5 = new Color();
    color5.setHSL(hue5, s5, l5);

    const defaultColorMaterial5 = defaultColor(color5, envmap);

    for (let i = 0; i < 8; i++) {
      const sphereItem = sphere(defaultColorMaterial5, Math.random()/4 + 0.2);
      sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      sphereItem.position.y = Math.random() + 2;
      sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      this.scene.add(sphereItem); 
      this.physics.add.existing(sphereItem);
    }
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };