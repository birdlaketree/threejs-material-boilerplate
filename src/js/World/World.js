import { Color } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { VrControls } from './system/VrControls.js';
import { sphere } from './components/meshes/sphere.js';
import { cube } from "./components/meshes/cube";
import { physicalMaterialShinyMetal} from './components/materials/physicalMaterial.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';
import { 
  physicalMaterialA,
  physicalMaterialB,
  matteFrostedPlastics
 } from './components/materials/physicalMaterial';
 import { roomComposition } from './components/compositions/roomComposition.js';
 import { createWalls } from './components/meshes/walls.js'

const hdrURL = new URL('/assets/textures/hdr/studio_small_08_2k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.floorSize = 12;

    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    const vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(vrControls);

    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.a5');

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

    // this.floor = createFloor(this.scene, this.floorSize, this.floorSize);
    this.walls = createWalls(this.scene, this.floorSize, envmap);

    // each material and its application is represented with a function
    
    const nItems = 8;
    const spreadWidth = 10;
    const hue = Math.random();
    // const hue = 0.6;

    const hueShift = hue + Math.random() * 0.2 - 0.1;
    const s1 = 1;
    const l1 = Math.random()/2;
    const s2 = 1;
    const l2 = Math.random()/2 + 0.5;

    const color1 = new Color();
    color1.setHSL(hueShift, s1, l1);

    const color2 = new Color();
    color2.setHSL(hueShift, s2, l2);

    const materialAPhysical = physicalMaterialA(color1, envmap);
    const materialBPhysical = physicalMaterialB(color2, envmap);
    const materialCPhysical = matteFrostedPlastics(color2, envmap);

    for (let i = 0; i < nItems; i++) {
      const hcp = {x: Math.random() * spreadWidth - spreadWidth/2, y:3, z:Math.random() * spreadWidth - spreadWidth/2};
      const cubeItem = cube(materialAPhysical, 0.5, 1, 0.5);
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

    const sphereMaterial = physicalMaterialShinyMetal(0xffffff, envmap);

    for (let i = 0; i < nItems; i++) {
      const sphereItem = sphere(materialBPhysical, Math.random()/4 + 0.2);
      sphereItem.position.x = Math.random() * spreadWidth - spreadWidth/2;
      sphereItem.position.y = Math.random() + 2;
      sphereItem.position.z = Math.random() * spreadWidth - spreadWidth/2;
      this.scene.add(sphereItem); 
      this.physics.add.existing(sphereItem);
    } 
    
    for (let i = 0; i < nItems; i++) {
      const sphereItem = sphere(materialCPhysical, Math.random()/4 + 0.2);
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