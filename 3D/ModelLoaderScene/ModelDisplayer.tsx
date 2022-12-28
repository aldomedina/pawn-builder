import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { DoubleSide, Mesh, ShaderMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { ISelectedMesh } from "../../types";
import CrazyMaterial from "../material/CrazyMaterial";
import c from "../material/initialSettings";

const ModelDisplayer: React.FC<{ SelectedMeshes: ISelectedMesh[] }> = ({
  SelectedMeshes,
}) => {
  const ref = useRef<Mesh>(null);
  const {
    scaleY,
    scaleX,
    scaleZ,
    rotateX,
    rotateY,
    rotateZ,
    density,
    strength,
    intensity,
    speed,
    animated,
  } = useControls({
    scaleX: { value: 1, min: 0, max: 10 },
    scaleY: { value: 1, min: 0, max: 10 },
    scaleZ: { value: 1, min: 0, max: 10 },
    rotateX: { value: 0, min: -180, max: 180 },
    rotateY: { value: 0, min: -180, max: 180 },
    rotateZ: { value: 0, min: -180, max: 180 },
    animated: { value: false },
    density: { value: c.density, min: 0, max: 10 },
    strength: { value: c.strength, min: 0, max: 100 },
    intensity: { value: c.intensity, min: 0, max: 10 },
    speed: { value: c.speed, min: 0, max: 1, step: 0.001 },
    backgroundColor: {
      value: "#0e088a",
      onChange: (col) => {
        if (document !== undefined) {
          document.body.style.backgroundColor = col;
        }
      },
    },
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    let material = ref.current.material as ShaderMaterial;
    if (!material.uniforms) return;
    material.uniforms.u_density.value = density;
    material.uniforms.u_strength.value = strength;
    material.uniforms.u_intensity.value = intensity;
    material.uniforms.u_speed.value = speed;
    if (animated) material.uniforms.u_time.value = clock.getElapsedTime();
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
          <>
            <mesh ref={ref} key={name} geometry={geometry}>
              {material === "shader" &&
                geometry?.boundingBox?.max &&
                geometry?.boundingBox?.min && (
                  <CrazyMaterial
                    max={geometry.boundingBox.max}
                    min={geometry.boundingBox.min}
                  />
                )}
              {material === "wireframe" && <meshStandardMaterial wireframe />}
            </mesh>
          </>
        );
      })}
    </group>
  );
};

export default ModelDisplayer;
