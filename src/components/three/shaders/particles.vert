// Vertex shader for particles
// Passes a per-particle offset to the fragment shader
attribute float aSize;
attribute float aOffset;

varying float vOffset;
varying float vSize;

void main() {
  vOffset = aOffset;
  vSize = aSize;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
