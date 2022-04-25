import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createFloor } from './components/meshes/floor.js';
import { VrControls } from './system/VrControls.js';
import { hingeComposition } from './components/bodies/hingeComposition.js';
import { sphere } from './components/meshes/sphere.js';
import { physicalMaterialShinyMetal} from './components/materials/physicalMaterial.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';
import { PMREMGenerator } from 'three';

const hdrURL = new URL('/assets/textures/hdr/old_quarry_gerlingen_2k.hdr', import.meta.url);

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.floorSize = 12;
    this.floor = createFloor(this.scene, this.floorSize, this.floorSize);

    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    const vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(vrControls);

    PhysicsLoader('static/ammo', () => this.ammoStart());
  }

  ammoStart() {
    console.log('ammoStart.4');

    this.physics = new AmmoPhysics(this.scene);
    // physics.debug.enable(true);
    this.loop.setPhysics(this.physics);

    const ground = this.physics.add.ground({ width: this.floorSize, height: this.floorSize, depth: 10, y:-5 });
    ground.visible = false;

    new RGBELoader().load(hdrURL, (hdrmap) => this.buildScene(hdrmap));
  }

  buildScene(hdrmap) {
    console.log('buildScene.4');
    const envmaploader = new PMREMGenerator(this.renderer);
    const envmap = envmaploader.fromCubemap(hdrmap);
    
    const nItems = 12;
    const spreadWidth = 10;
    const hue = Math.random();
    // const hue = 0.6;

    for (let i = 0; i < nItems; i++) {
      const hcp = {x: Math.random() * spreadWidth - spreadWidth/2, y:3, z:Math.random() * spreadWidth - spreadWidth/2};
      const hc = hingeComposition(hcp, hue, this.scene, this.loop, this.physics, envmap);
    }

    // const sphereMaterial = physicalMaterialShinyMetal(0xffffff, envmap);
    // const s = sphere(sphereMaterial, 1);
    // this.scene.add(s); 
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };