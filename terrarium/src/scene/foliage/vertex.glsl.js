const shader = `
uniform float windSpeed;
uniform float windTime;

float invert(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = invert(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

mat4 rotateZ(float radians) {
  float c = cos(radians);
  float s = sin(radians);

  return mat4(
    c, -s, 0, 0,
    s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}

vec4 applyWind(vec4 v) {
  float remappedNormal = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
  float pos = position.y + position.x;
  float pow = windSpeed / 5.0 * -0.3;

  float b = remap(cos(windTime + pos), -1.0, 1.0, 0.0, 0.02);
  float t = remap(sin(windTime + pos), -1.0, 1.0, 0.0, pow);
  float radians = mix(b, t, remappedNormal);

  return rotateZ(radians) * v;
}

vec2 calculateInitialOffsetFromUVs() {
  vec2 offset = vec2(
    remap(uv.x, 0.0, 1.0, -1.0, 1.0),
    remap(uv.y, 0.0, 1.0, -1.0, 1.0)
  );

  // Invert the vertex offset so it's positioned towards the camera.
  offset *= vec2(-1.0, 1.0);
  offset = normalize(offset) * 1.0;

  return offset;
}

void main() {
  vec2 vertexOffset = calculateInitialOffsetFromUVs();
  vec3 inflatedVertexOffset = vec3(vertexOffset, 0.0) + normal.xyz * 0.01;

  vec4 worldViewPosition = modelViewMatrix * vec4(position, 1.0);

  worldViewPosition += vec4(mix(vec3(0.5), inflatedVertexOffset, 1.0), 0.0);

  // wind
  worldViewPosition = applyWind(worldViewPosition);

  csm_PositionRaw = projectionMatrix * worldViewPosition;
}`;

export default shader;
