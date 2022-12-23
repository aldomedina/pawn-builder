import { Mesh } from "three";

export type States = "init" | "selecting" | "display";
export type Materials = "standard" | "wireframe" | "shader";
export interface ISelectedMesh {
  material: Materials;
  mesh: Mesh;
}
