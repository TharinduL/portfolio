export const tunnelVertexShader = /* glsl */ `
  uniform float time;
  uniform sampler2D pathTexture;
  uniform vec2 mouse;
  varying vec2 vUv;

  vec3 getPointAt(float t) {
    float texelSize = 1.0 / 128.0;
    float x = texture2D(pathTexture, vec2(t, 0.0)).x;
    float y = texture2D(pathTexture, vec2(t, 0.5)).y;
    return vec3(x, y, 0.0);
  }

  void main() {
    vUv = uv;
    float u = uv.y;

    vec3 point = getPointAt(u);
    vec3 tangent = normalize(getPointAt(u + 0.01) - point);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 xAxis = normalize(cross(up, tangent));
    vec3 yAxis = cross(tangent, xAxis);
    mat3 rotationMatrix = mat3(xAxis, yAxis, tangent);

    point.xy += mouse * 0.15;

    float radiusScale = 1.0 + sin(position.y * 2.0 + time * 0.5) * 0.1;
    vec3 twistedPos = rotationMatrix * (position * radiusScale) + point;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(twistedPos, 1.0);
  }
`;

export const tunnelFragmentShader = /* glsl */ `
  uniform float time;
  uniform sampler2D texture1;
  uniform vec2 resolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 aspectUV = vec2(uv.x * (resolution.x / resolution.y), uv.y);
    float dist = length(aspectUV - vec2(0.5 * (resolution.x / resolution.y), 0.5));
    float vignette = smoothstep(1.2, 0.3, dist);

    vec4 texColor = texture2D(texture1, vUv * vec2(4.0, 2.0));
    texColor.rgb *= vignette;

    float ring = sin(vUv.y * 40.0 - time * 3.0);
    ring = max(0.0, ring);
    float ringIntensity = smoothstep(0.8, 1.0, ring) * 0.5;
    texColor.rgb += vec3(0.79, 0.66, 0.43) * ringIntensity;

    gl_FragColor = vec4(texColor.rgb, 1.0);
  }
`;
