// @ts-nocheck

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const ShaderToyCanvas = ({
  className,
  ...props
}: GenericReactHTMLNode) => {
  const [vertex, setVertex] = useState('');
  const [fragment, setFragment] = useState('');

  // Fetch the shaders once the component mounts
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios.get('/vertexShader.glsl').then((res) => setVertex(res.data));
    axios.get('/fragmentShader.glsl').then((res) => setFragment(res.data));
  }, []);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="aspect-square border min-h-full w-full">
        <Canvas className="absolute object-center w-full">
          <Scene vertex={vertex} fragment={fragment} />
        </Canvas>
      </div>
    </div>
  );
};

const Scene = ({ vertex, fragment }: { vertex: string; fragment: string }) => {
  const meshRef = useRef(null);

  const noiseTexture = useTexture('noise2.png');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    if (meshRef.current) meshRef.current.material.uniforms.iTime.value = time;
  });

  const uniforms = useMemo(
    () => ({
      colour: {
        type: '',
      },
      iTime: {
        type: 'f',
        value: 1.0,
      },
      iResolution: {
        type: 'v2',
        value: new THREE.Vector2(1, 1),
      },
    }),
    [],
  );

  return (
    <mesh ref={meshRef}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
      <planeGeometry args={[1]} />
    </mesh>
  );
};
