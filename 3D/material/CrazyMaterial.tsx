import { useRef } from "react";
import { DoubleSide, Vector3 } from "three";
import createMaterial from "./createMaterial";

const CrazyMaterial: React.FC<{ max: Vector3; min: Vector3 }> = ({
  max,
  min,
}) => (
  <shaderMaterial
    attach="material"
    args={[createMaterial(max, min)]}
    side={DoubleSide}
  />
);

export default CrazyMaterial;
