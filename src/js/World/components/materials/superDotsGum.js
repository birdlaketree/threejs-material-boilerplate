import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const colorMapUrl        = new URL('/assets/copyrighted/textures/Super_Dots_Gum/Super_Dots_Gum_BaseColor.jpeg', import.meta.url);
const normalMapUrl       = new URL('/assets/copyrighted/textures/Super_Dots_Gum/Super_Dots_Gum_Normal.jpeg', import.meta.url);
const roughnessMapUrl    = new URL('/assets/copyrighted/textures/Super_Dots_Gum/Super_Dots_Gum_Roughness.jpeg', import.meta.url);
const displacementMapUrl    = new URL('/assets/copyrighted/textures/Super_Dots_Gum/Super_Dots_Gum_Displacement.jpeg', import.meta.url);

const superDotsGum = (color, envmap) => {
  const colorMap = textureHandler(colorMapUrl);
  const normalMap = textureHandler(normalMapUrl);
  const roughnessMap = textureHandler(roughnessMapUrl);
  const displacementMap = textureHandler(displacementMapUrl);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 0.6,

    map: colorMap,
    // color: color,

    normalMap: normalMap,
		normalScale: new Vector2( 1, 1 ),

    roughnessMap: roughnessMap,
    // roughness: 0.3,

    // displacementMap: displacementMap,
  }

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export { superDotsGum };