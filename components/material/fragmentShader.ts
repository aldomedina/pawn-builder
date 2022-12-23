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

vec2 rotateCoord(vec2 uv, float rads) {
  uv *= mat2(cos(rads), sin(rads), -sin(rads), cos(rads));
  return uv;
}

float plot(vec2 st, float thresholdX, float strokeW) {    
  return step( abs(st.y - .4 - st.x + thresholdX), strokeW);
}


float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 addNoise(vec3 col) {
  float amount = 0.17;
  float noise = (random2d(vUvB) - 0.5) * amount;
  return vec3(col.x + noise, col.y + noise, col.z+noise);
}

void main() {
  float strokeW = .08;
  float h = 0.33;
  float distort = vDistort * u_intensity;
  vec2 center = -1.0 + 2.0 * vUvB;
  vec2 uv = floor(center.xy * u_cellSize);
      
  vec3 wh = vec3(0.0);
  vec3 bl = vec3(1.0);
  vec3 wh_ns = addNoise(vec3(0.0));
  vec3 bl_ns = addNoise(vec3(1.0));    
  vec3 col1 = mix(mix(u_col1, u_col2, vUv.y/h), mix(u_col2, u_col3, (vUv.y - h)/(1.0 - h*2.)), step(h, vUv.y));  
  vec3 col2 = mix(mix(u_col3, u_col4, (vUv.y - h)/(1.0 - h*2.)), mix(u_col3, u_col4, (vUv.y - h*1.)/(1.0-h*2.)), distort);
  vec3 col1_ns = addNoise(col1);
  vec3 col2_ns = addNoise(col2);
  vec3 bg1g = mix(u_bg1,col1,distort);
  vec3 bg2g = mix(u_bg2,col2,distort);  
  vec3 fCol = mix(col1,col2,distort);


  if (vUv.y > u_grainTop || vUv.y < u_grainBottom  ) {
    fCol = addNoise(fCol);
  }

  float pct = plot(vUv, 0., strokeW);
  fCol = (1.0-pct)*fCol+pct*col2;
  float pct2 = plot(vUv, strokeW*4., strokeW);
  fCol = (1.0-pct2)*fCol+pct2*col2;
  float pct3 = plot(vUv, strokeW*-4., strokeW);
  fCol = (1.0-pct3)*fCol+pct3*col2;
  float pct4 = plot(vUv, strokeW*8., strokeW);
  fCol = (1.0-pct4)*fCol+pct4*col2;
  float pct5 = plot(vUv, strokeW*-8., strokeW);
  fCol = (1.0-pct5)*fCol+pct5*col2;
  float pct6 = plot(vUv, strokeW*12., strokeW);
  fCol = (1.0-pct6)*fCol+pct6*col2;

  float sw = strokeW / 4.;
  float pctSolid = plot(vUv, 0.,sw);
  fCol = (1.0-pctSolid)*fCol+pctSolid*u_col1;
  float pctSolid2 = plot(vUv, 0.64,sw);
  fCol = (1.0-pctSolid2)*fCol+pctSolid2*u_col2;
  float pctSolid3 = plot(vUv, -0.34,sw);
  fCol = (1.0-pctSolid3)*fCol+pctSolid3*u_col3;
  float pctSolid4 = plot(vUv, 0.08,sw);
  fCol = (1.0-pctSolid4)*fCol+pctSolid4*u_col4;
  
    if (vUv.y < u_chessTop && vUv.y > u_chessBottom  ) {
        if(mod(uv.x + uv.y, 2.0) > 0.5) {
            fCol = vec3(col1);
        } else if (mod(uv.x + uv.y, 2.0) < 0.5){
            fCol = vec3(col2);
        }
    }

  gl_FragColor = vec4(LINEAR_TO_SRGB(fCol), 1.0);
}  
`;

export default fragmentShader;
