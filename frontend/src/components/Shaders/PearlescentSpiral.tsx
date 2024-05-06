import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { PlaneGeometry } from 'three';

// @ts-ignore
import ShaderToyMaterial from 'three-shadertoy-material';

export function PearlescentSpiralCanvas({ ...props }) {
  return (
    <Canvas resize={{ scroll: false }} {...props}>
      <PearlescentSpiralScene />
    </Canvas>
  );
}

export function PearlescentSpiralScene() {
  const material = new ShaderToyMaterial(shadercode);
  const geometry = useMemo(() => new PlaneGeometry(), []);

  return (
    <mesh scale={[16, 8, 1]} material={material} geometry={geometry}></mesh>
  );
}

const shadercode = `float smin(float d1, float d2, float k) { 
	float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0); 
	return mix(d2, d1, h) - k * h * (1.0 - h); 
} 

vec3 hue_shift(vec3 col, float hue) {
    return mix(vec3(dot(vec3(0.333), col)), col, cos(hue)) + cross(vec3(0.577), col) * sin(hue);
}

vec2 rot2d(vec2 v, float a) {
	return cos(a) * v + sin(a) * vec2(-v.y, v.x);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;
    float a = atan(uv.y, uv.x);
    float l = length(uv);

    float d = 0.0;
    vec2 p = sin(uv * l);
    p = rot2d(p, -cos(l * 5.0 + iTime));
    d = length(exp(-p * p));
    p = rot2d(p, d - cos(l * 3.0 + iTime));
    p = rot2d(p, smoothstep(0.0, -0.5, abs(cos(atan(p.y, p.x))) - 0.7));
    d = smin(length(p), d, 0.9);
    p = rot2d(p, l + a);

    vec3 c = vec3(0);
    c = sin(d * vec3(4, 3, 1)) * 0.5 + 0.5;
    c = hue_shift(c, atan(p.y, p.x) - iTime);
    c.b += d * 0.25;
    c.b = sqrt(c.b);
    c *= c * 0.4 + 0.6;

    fragColor = vec4(c, 1.0);
}`;
