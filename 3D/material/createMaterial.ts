import { Color, ShaderLib, Vector3 } from "three";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import c from "./initialSettings";

export default function createMaterial(max: Vector3, min: Vector3) {
  const nc = (col: string) => new Color(col);
  console.log(ShaderLib.standard.uniforms);
  const material = {
    vertexShader,
    fragmentShader,
    uniforms: {
      u_time: { value: 0 },
      u_speed: { value: c.speed ?? 0.2 },
      u_density: { value: c.density },
      u_strength: { value: c.strength },
      u_frequency: { value: c.frequency },
      u_amplitude: { value: c.amplitude },
      u_intensity: { value: c.intensity },
      u_period: { value: c.period },
      strokeW: { value: 0.08 },
      u_bBoxMin: {
        value: min,
      },
      u_bBoxMax: {
        value: max,
      },
      u_col1: {
        value: nc(c.palette[0]),
      },
      u_col2: {
        value: nc(c.palette[1]),
      },
      u_col3: {
        value: nc(c.palette[2]),
      },
      u_col4: {
        value: nc(c.palette[3]),
      },
      u_bg1: {
        value: nc(c.bg[0]),
      },
      u_bg2: {
        value: nc(c.bg[1]),
      },
      u_cellSize: {
        value: c.cellSize,
      },
      u_chessTop: {
        value: c.ctop,
      },
      u_chessBottom: {
        value: c.cbottom,
      },
      u_grainTop: {
        value: c.ctop,
      },
      u_grainBottom: {
        value: c.cbottom,
      },
    },
  };

  return material;
}
