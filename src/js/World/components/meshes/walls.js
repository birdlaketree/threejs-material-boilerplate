import {Math, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, Vector2 } from 'three';
import { textureHandler } from '../../system/textureHandler';

const mapUrl             = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Albedo.jpg', import.meta.url);
const aoMapUrl           = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_AO.jpg', import.meta.url);
const normalMapUrl       = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Normal.jpg', import.meta.url);
const roughnessMapUrl    = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Roughness.jpg', import.meta.url);

const createWalls = (scene, size = 20, envmap = null) => {
  const repeat = 4;
  const mapTexture = textureHandler(mapUrl, repeat);
  const aoTexture = textureHandler(aoMapUrl, repeat);
  const normalTexture = textureHandler(normalMapUrl, repeat);
  const roughnessTexture = textureHandler(roughnessMapUrl, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    // color: 0x3333ff,
    // side: DoubleSide,
    // roughness: 0.8,
    // metalness: 0,
    map: mapTexture,
    aoMap: aoTexture,
    normalMap: normalTexture,
    normalScale: new Vector2(1.0, 1.0),
    roughnessMap: roughnessTexture
  } 

  const material = new MeshStandardMaterial(parameters);

  const geometry = new PlaneGeometry(size, size, 4, 4);
  geometry.attributes.uv2 = geometry.attributes.uv; // second uv is needed for aoMap

  const floor = new Mesh( geometry, material );
  floor.receiveShadow = true;
  floor.rotation.x = Math.degToRad(270);
  scene.add(floor);

  const ceeling = new Mesh( geometry, material );
  ceeling.receiveShadow = true;
  ceeling.rotation.x = Math.degToRad(90);
  ceeling.position.y = size;
  scene.add(ceeling);

  const wallLeft = new Mesh( geometry, material );
  wallLeft.receiveShadow = true;
  wallLeft.rotation.y = Math.degToRad(90);
  wallLeft.position.x = -size/2;
  wallLeft.position.y = size/2;
  scene.add(wallLeft);

  const wallRight = new Mesh( geometry, material );
  wallRight.receiveShadow = true;
  wallRight.rotation.y = Math.degToRad(270);
  wallRight.position.x = size/2;
  wallRight.position.y = size/2;
  scene.add(wallRight);

  const wallFront = new Mesh( geometry, material );
  wallFront.receiveShadow = true;
  wallFront.rotation.y = Math.degToRad(180);
  wallFront.position.x = 0;
  wallFront.position.y = size/2;
  wallFront.position.z = size/2;
  scene.add(wallFront);

  const wallBack = new Mesh( geometry, material );
  wallBack.receiveShadow = true;
  wallBack.position.x = 0;
  wallBack.position.y = size/2;
  wallBack.position.z = -size/2;
  scene.add(wallBack);
}

export { createWalls };