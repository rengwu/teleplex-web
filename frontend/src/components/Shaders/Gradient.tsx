import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { PlaneGeometry } from 'three';

// @ts-ignore
import ShaderToyMaterial from 'three-shadertoy-material';

export function GradientCanvas({ ...props }) {
  return (
    <Canvas resize={{ scroll: false }} {...props}>
      <GradientScene />
    </Canvas>
  );
}

export function GradientScene() {
  const material = new ShaderToyMaterial(shadercode);
  const geometry = useMemo(() => new PlaneGeometry(), []);

  return (
    <mesh scale={[40, 20, 1]} material={material} geometry={geometry}></mesh>
  );
}

const shadercode = `void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    float d = (-iTime * 0.5 * 0.2 * 0.2) - 3600.0;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
    }
    d += iTime * 0.5 * 0.1;
    vec3 col = vec3(sin(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col =   sin(col * cos(vec3(d, a, 2.1)) * 0.8 + 0.1);
    fragColor = vec4(col,1.0);
}`;
