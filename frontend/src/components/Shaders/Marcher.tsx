import { Canvas, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { PlaneGeometry, Vector3 } from 'three';

// @ts-ignore
import ShaderToyMaterial from 'three-shadertoy-material';

export function MarcherCanvas({ ...props }) {
  return (
    <Canvas resize={{ scroll: false }} {...props}>
      <MarcherScene />
    </Canvas>
  );
}

export function MarcherScene() {
  const material = new ShaderToyMaterial(shadercode);

  const geometry = useMemo(() => new PlaneGeometry(), []);

  return (
    <mesh scale={[40, 20, 1]} material={material} geometry={geometry}></mesh>
  );
}

const shadercode = `void mainImage( out vec4 fragColor, in vec2 fragCoord ){
  vec2 uv =  (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

  for(float i = 1.0; i < 10.0; i++){
      uv.x += 0.6 / i * cos(i * 2.5* uv.y + iTime * 0.1);
      uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime * 0.2);
  }
  
  fragColor = vec4(vec3(0.1)/abs(sin(iTime-uv.y-uv.x)),1.0);
}
  `;
