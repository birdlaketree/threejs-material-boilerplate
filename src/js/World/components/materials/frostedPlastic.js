import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const frostedPlastic_aoMapUrl           = new URL('/assets/textures/noise-roughness.png', import.meta.url);
const frostedPlastic_normalMapUrl       = new URL('/assets/textures/noise-normal.png', import.meta.url);
const frostedPlastic_roughnessMapUrl    = new URL('/assets/textures/noise-roughness.png', import.meta.url);

const frostedPlastic = (color, envmap) => {
  const repeat = 1;
  // const mapTexture = textureHandler(mapUrl, repeat);
  const aoTexture = textureHandler(frostedPlastic_aoMapUrl, repeat);
  // const displacementTexture = textureHandler(displacementMapUrl, repeat);
  const normalMap = textureHandler(frostedPlastic_normalMapUrl, repeat);
  const clearcoatNormalMap = textureHandler(frostedPlastic_normalMapUrl, repeat);
  const roughnessTexture = textureHandler(frostedPlastic_roughnessMapUrl, repeat);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 0.8,

    clearcoat: 0.1,
    clearcoatRoughness: 0.8,
		metalness: 0,
    roughness: 0.1,
    color: color,
    // color: 0xdddff,
    // emissive: 0x000000,

    transmission: 0.2,
    reflectivity: 0,
    ior: 2.1, // from 1.0 to 2.333
    specularIntensity: 0.2,
    // thickness: 0.0001,
    thickness: 0.04,

    sheen: 0,

    // opacity: 0.90,
		// transparent: false,

    // map: roughnessTexture,
    aoMap: aoTexture,
    // displacementMap: displacementTexture,
    // displacementScale: 1,
    // displacementBias: -0.5,
    // roughnessMap: roughnessTexture,

    normalMap: normalMap,
		normalScale: new Vector2(0.02, 0.02),
		clearcoatNormalMap: clearcoatNormalMap,
    // clearcoatNormalScale: new Vector2(0.4, 0.4)
  }
  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export {frostedPlastic};