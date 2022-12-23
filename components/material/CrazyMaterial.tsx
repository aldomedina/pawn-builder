import { useRef } from "react";
import { Color, DoubleSide, Vector3 } from "three";
import { useControls } from "leva";
import createMaterial from "./createMaterial";
import c from "./initialSettings";
import { useFrame } from "@react-three/fiber";

const nc = (col: string) => new Color(col);

const CrazyMaterial: React.FC<{ max: Vector3; min: Vector3 }> = ({
  max,
  min,
}) => {
  const ref = useRef(null);
  const material = createMaterial(max, min);

  const {
    speed,
    density,
    strength,
    frequency,
    amplitude,
    intensity,
    cellSize,
    chessTop,
    chessBottom,
    grainTop,
    grainBottom,
  } = useControls({
    density: { value: c.density, min: 0, max: 10 },
    strength: { value: c.strength, min: 0, max: 10 },
    frequency: { value: c.frequency, min: 0, max: 10 },
    amplitude: { value: c.amplitude, min: 0, max: 10 },
    intensity: { value: c.intensity, min: 0, max: 10 },
    speed: { value: c.speed, min: 0, max: 50 },
    cellSize: { value: c.cellSize, min: 0, max: 3000 },
    chessTop: { value: c.ctop, min: -2, max: 2 },
    chessBottom: { value: c.cbottom, min: 0, max: 0.5 },
    grainTop: { value: c.ctop, min: 0, max: 50 },
    grainBottom: { value: c.cbottom, min: 0, max: 50 },

    col1: {
      value: c.palette[0],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_col1.value = nc(value);
      },
    },
    col2: {
      value: c.palette[1],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_col2.value = nc(value);
      },
    },
    col3: {
      value: c.palette[2],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_col3.value = nc(value);
      },
    },
    col4: {
      value: c.palette[3],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_col4.value = nc(value);
      },
    },
    bg1: {
      value: c.bg[0],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_bg1.value = nc(value);
      },
    },
    bg2: {
      value: c.bg[1],
      onChange: (value) => {
        if (!ref.current) return;
        //@ts-ignore
        ref.current.uniforms.u_bg2.value = nc(value);
      },
    },
  });

  useFrame(() => {
    if (!ref.current) return;

    //@ts-ignore
    ref.current.uniforms.u_density.value = density;
    //@ts-ignore
    ref.current.uniforms.u_strength.value = strength;
    //@ts-ignore
    ref.current.uniforms.u_frequency.value = frequency;
    //@ts-ignore
    ref.current.uniforms.u_amplitude.value = amplitude;
    //@ts-ignore
    ref.current.uniforms.u_intensity.value = intensity;
    //@ts-ignore
    ref.current.uniforms.u_speed.value = speed;
    //@ts-ignore
    ref.current.uniforms.u_cellSize.value = cellSize;
    //@ts-ignore
    ref.current.uniforms.u_chessTop.value = chessTop;
    //@ts-ignore
    ref.current.uniforms.u_chessBottom.value = chessBottom;
    //@ts-ignore
    ref.current.uniforms.u_grainTop.value = grainTop;
    //@ts-ignore
    ref.current.uniforms.u_grainBottom.value = grainBottom;
  });

  return (
    <shaderMaterial
      //@ts-ignore
      ref={ref}
      attach="material"
      args={[material]}
      side={DoubleSide}
    />
  );
};

export default CrazyMaterial;
