import {
  MeshStandardMaterial
} from 'three';

const defaultColorMaterial = (color) => {
  const parameters = {
    color: color,
    roughness: 0.8,
    metalness: 0.1,
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export {
  defaultColorMaterial
};