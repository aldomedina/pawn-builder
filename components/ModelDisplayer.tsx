import { useControls } from "leva";
import { DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { ISelectedMesh } from "../types";
import CrazyMaterial from "./material/CrazyMaterial";

const ModelDisplayer: React.FC<{ SelectedMeshes: ISelectedMesh[] }> = ({
  SelectedMeshes,
}) => {
  console.log(SelectedMeshes);
  const { scaleY, scaleX, scaleZ, rotateX, rotateY, rotateZ, standardColor } =
    useControls({
      scaleX: { value: 1, min: 0, max: 10 },
      scaleY: { value: 1, min: 0, max: 10 },
      scaleZ: { value: 1, min: 0, max: 10 },
      rotateX: { value: 0, min: -180, max: 180 },
      rotateY: { value: 0, min: -180, max: 180 },
      rotateZ: { value: 0, min: -180, max: 180 },
      standardColor: { value: "#0e088a" },
    });
  return (
    <group
      scale={[scaleX, scaleY, scaleZ]}
      rotation={[degToRad(rotateX), degToRad(rotateY), degToRad(rotateZ)]}
    >
      {SelectedMeshes.map((el) => {
        const {
          mesh: { geometry, name },
          material,
        } = el;
        geometry.computeBoundingBox();
        return (
          <mesh key={name} geometry={geometry}>
            {material === "shader" &&
              geometry?.boundingBox?.max &&
              geometry?.boundingBox?.min && (
                <CrazyMaterial
                  max={geometry.boundingBox.max}
                  min={geometry.boundingBox.min}
                />
              )}
            {material === "wireframe" && <meshStandardMaterial wireframe />}
            {material === "standard" && (
              <meshStandardMaterial color={standardColor} side={DoubleSide} />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export default ModelDisplayer;
