import {Math, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, Vector2 } from 'three';
import { textureHandler } from '../../system/textureHandler';

const mapUrl             = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Albedo.jpg', import.meta.url);
const aoMapUrl           = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_AO.jpg', import.meta.url);
const normalMapUrl       = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Normal.jpg', import.meta.url);
const roughnessMapUrl    = new URL('/assets/textures/Concrete_Dirty_ue4idgdlw_4K_surface_ms/ue4idgdlw_4K_Roughness.jpg', import.meta.url);

const createFloor = (scene, width = 20, height = 20) => {
  const geometry = new PlaneGeometry(width, height, 32, 32);

  const repeat = 4;
  const mapTexture = textureHandler(mapUrl, repeat);
  const aoTexture = textureHandler(aoMapUrl, repeat);
  const normalTexture = textureHandler(normalMapUrl, repeat);
  const roughnessTexture = textureHandler(roughnessMapUrl, repeat);

  const parameters = {
    color: 0xffffff,
    side: DoubleSide,
    // roughness: 0.8,
    metalness: 0.2,
    map: mapTexture,
    aoMap: aoTexture,
    normalMap: normalTexture,
    normalScale: new Vector2(3.0, 3.0),
    roughnessMap: roughnessTexture
  } 
  const material = new MeshStandardMaterial(parameters);
  const mesh = new Mesh( geometry, material );
  mesh.receiveShadow = true;
  mesh.rotation.x = Math.degToRad(90);
  scene.add(mesh)
  return mesh;
}

export { createFloor };