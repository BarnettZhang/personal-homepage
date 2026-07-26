// Fragment shader for the energy core
// Creates a plasma-like glowing orb with fresnel edge effect
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColor1; // cyan
uniform vec3 uColor2; // blue
uniform vec3 uColor3; // deep blue

// Simple 2D noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  // Fresnel effect — brighter at edges
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float fresnel = 1.0 - abs(dot(vNormal, viewDir));
  fresnel = pow(fresnel, 2.5);

  // Noise pattern for plasma texture
  float n = noise(vUv * 8.0 + uTime * 0.3);
  float n2 = noise(vUv * 4.0 - uTime * 0.2);

  // Pulsing effect
  float pulse = 1.0 + 0.15 * sin(uTime * 2.0) + 0.1 * sin(uTime * 3.7 + 1.5);

  // Color mixing with noise
  vec3 color = mix(uColor1, uColor2, n * 0.7 + 0.3);
  color = mix(color, uColor3, fresnel * 0.6 + n2 * 0.2);

  // Add bright spots
  float brightSpot = smoothstep(0.55, 0.7, n) * 0.4;
  color += uColor1 * brightSpot;

  // Fresnel edge glow
  color += uColor1 * fresnel * 0.6 * pulse;

  // Center bright core
  float centerGlow = 1.0 - length(vUv - 0.5) * 2.0;
  centerGlow = pow(max(centerGlow, 0.0), 3.0);
  color = mix(color, vec3(1.0), centerGlow * 0.3 * pulse);

  // Alpha for blending
  float alpha = 0.85 + fresnel * 0.15 + centerGlow * 0.15;

  gl_FragColor = vec4(color, alpha);
}
