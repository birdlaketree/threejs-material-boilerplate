import {
  MeshStandardMaterial
} from 'three';

const defaultColor = (color, envmap) => {
  const parameters = {
    envMap: envmap.texture,
    envMapIntensity: 1,
    color: color,
    roughness: 0,
    metalness: 0,
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  defaultColor
};