import { Mesh } from "three";

export type States = "init" | "selecting" | "display";
export type Materials = "standard" | "wireframe" | "shader";
export interface ISelectedMesh {
  material: Materials;
  mesh: Mesh;
}

export type V3 = {
  x: number;
  y: number;
  z: number;
};

export type GradientColors = {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
};

export interface IChessPieces extends GradientColors {
  rotation: V3;
  scale: V3;
  strenght: number;
  backgroundColor: string;
}
