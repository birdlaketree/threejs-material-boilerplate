import {
  Vector2,
  MeshPhysicalMaterial,
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const shinyNoiseMetal_normalMapUrl       = new URL('/assets/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Normal.jpg', import.meta.url);
const shinyNoiseMetal_roughnessMapUrl    = new URL('/assets/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Roughness.jpg', import.meta.url);
const shinyNoiseMetal_metalnessMapUrl    = new URL('/assets/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_Metalness.jpg', import.meta.url);
const shinyNoiseMetal_aoMapUrl           = new URL('/assets/textures/Imperfections_rmpkcg0p_4K_surface_ms/rmpkcg0p_4K_ao.jpg', import.meta.url);

const steelWithSchratches = (color, envmap) => {
  const aoTexture = textureHandler(shinyNoiseMetal_aoMapUrl);
  const normalMap = textureHandler(shinyNoiseMetal_normalMapUrl);
  const roughnessTexture = textureHandler(shinyNoiseMetal_roughnessMapUrl);
  const metalnessMap = textureHandler(shinyNoiseMetal_metalnessMapUrl);

  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 0.9,

    color: color,
    clearcoat: 0,

    aoMap: aoTexture,

    normalMap: normalMap,
		normalScale: new Vector2( 0.1, 0.1 ),

    roughnessMap: roughnessTexture,
    roughness: 0.3,

    metalnessMap: metalnessMap,
    metalness: 0.98,
  }

  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export { steelWithSchratches };