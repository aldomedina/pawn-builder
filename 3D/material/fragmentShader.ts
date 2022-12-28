const fragmentShader = `
#define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))

varying float vDistort;
varying vec2 vUv;      
varying vec2 vUvB;      

uniform vec3 u_col1;
uniform vec3 u_col2;
uniform vec3 u_col3;
uniform vec3 u_col4;
uniform vec3 u_bg1;
uniform vec3 u_bg2;
uniform float u_time;
uniform float u_intensity;
uniform float u_cellSize;
uniform float u_chessTop;
uniform float u_chessBottom;
uniform float u_grainTop;
uniform float u_grainBottom;
uniform float strokeW;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 addNoise(vec3 col) {
  float amount = 0.17;
  float noise = (random2d(vUv) - 0.5) * amount;
  return vec3(col.x + noise, col.y + noise, col.z+noise);
}

void main() {
  
  float h = 0.33;
  float distort = vDistort * u_intensity;
  vec2 center = -1.0 + 2.0 * vUvB;
  vec2 uv = floor(center.xy * u_cellSize);
  vec3 col1 = mix(mix(u_col1, u_col2, vUv.y/h), mix(u_col2, u_col3, (vUv.y - h)/(1.0 - h*2.)), step(h, vUv.y));  
  vec3 col2 = mix(mix(u_col3, u_col4, (vUv.y - h)/(1.0 - h*2.)), mix(u_col3, u_col4, (vUv.y - h*1.)/(1.0-h*2.)), distort);

  vec3 fCol = mix(col1,col2,distort);
  fCol = LINEAR_TO_SRGB(fCol);  
  gl_FragColor = vec4(LINEAR_TO_SRGB(fCol), 1.0);
}  
`;

export default fragmentShader;
