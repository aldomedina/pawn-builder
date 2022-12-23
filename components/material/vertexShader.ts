import noise from "./noise";

const vertexShader = ` 

varying float vDistort;
  
varying vec2 vUv;
varying vec2 vUvB;
uniform vec3 u_bBoxMin;
uniform vec3 u_bBoxMax;
uniform float u_time;
uniform float u_speed;
uniform float u_density;
uniform float u_strength;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_period;

${noise}

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

vec3 rotateY(vec3 v, float angle) {
  return rotation3dY(angle) * v;
}  

void main() {
  float t = u_time * u_speed;
  float distortion = pnoise((normal + t) * u_density, vec3(u_period)) * u_strength;
  vUv.y = (position.y - u_bBoxMin.y) / (u_bBoxMax.y - u_bBoxMin.y);

  vUvB = uv;
  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * u_frequency + t) * u_amplitude;
  pos = rotateY(pos, angle);    
  vDistort = distortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}  
`;

export default vertexShader;
