'use client';

import { ContentPadding } from '@/components/ContentPadding';
import { useRenderFrameLoop } from '@/utils/gl-react/useRenderFrameLoop';
import * as THREE from 'three';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Canvas,
  MeshBasicMaterialProps,
  ThreeElements,
  useFrame,
} from '@react-three/fiber';
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
  DragControls,
} from '@react-three/drei';
import { easing } from 'maath';
import './util';
import ShaderToyDecoder from 'three/examples/jsm/transpiler/ShaderToyDecoder.js';
import axios from 'axios';
import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';

export default function GLSLTestPage() {
  return (
    <ContentPadding className="">
      <div>GLSL TEST PAGE</div>
      <div className="border relative h-screen">
        <ShaderToyCanvas />
      </div>
      {/* <div className="border h-[800px]">
        <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
          <fog attach="fog" args={['#a79', 8.5, 12]} />
          <DragControls onDrag={(localMatrix) => {}}>
            <Rig rotation={[0, 0, 0.15]}>
              <Carousel />
            </Rig>
            <Banner position={[0, -0.15, 0]} />
          </DragControls>
          <Environment preset="apartment" background blur={0.5} />
        </Canvas>
      </div> */}
    </ContentPadding>
  );
}

const ShaderToyCanvas = ({ className, ...props }: GenericReactHTMLNode) => {
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
  const meshRef = useRef<
    THREE.Mesh & {
      material: {
        uniforms: typeof uniforms;
      };
    }
  >(null);

  const noiseTexture = useTexture('noise2.png');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    if (meshRef.current)
      meshRef.current.material.uniforms.iTime.value = time + 20;
  });

  const uniforms = useMemo(
    () => ({
      iTime: {
        type: 'f',
        value: 1.0,
      },
      iResolution: {
        type: 'v2',
        value: new THREE.Vector2(1, 1),
      },
      iChannel0: {
        type: 't',
        value: noiseTexture,
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

// function Rig(props) {
//   const ref = useRef();
//   // const scroll = useScroll();
//   useFrame((state, delta) => {
//     ref.current.rotation.y = Math.PI * 2; // Rotate contents
//     state.events.update(); // Raycasts every frame rather than on pointer-move
//     easing.damp3(
//       state.camera.position,
//       [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
//       0.3,
//       delta,
//     ); // Move camera
//     state.camera.lookAt(0, 0, 0); // Look at center
//   });
//   return <group ref={ref} {...props} />;
// }

// function Carousel({ radius = 1.4, count = 8 }) {
//   return Array.from({ length: count }, (_, i) => (
//     <Card
//       key={i}
//       url={'https://picsum.photos/800'}
//       position={[
//         Math.sin((i / count) * Math.PI * 2) * radius,
//         0,
//         Math.cos((i / count) * Math.PI * 2) * radius,
//       ]}
//       rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
//     />
//   ));
// }

// function Card({ url, ...props }) {
//   const ref = useRef();
//   const [hovered, hover] = useState(false);
//   const pointerOver = (e) => (e.stopPropagation(), hover(true));
//   const pointerOut = () => hover(false);
//   useFrame((state, delta) => {
//     easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
//     easing.damp(
//       ref.current.material,
//       'radius',
//       hovered ? 0.25 : 0.1,
//       0.2,
//       delta,
//     );
//     easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
//   });
//   return (
//     <Image
//       ref={ref}
//       url={url}
//       transparent
//       side={THREE.DoubleSide}
//       onPointerOver={pointerOver}
//       onPointerOut={pointerOut}
//       {...props}
//     >
//       <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
//     </Image>
//   );
// }

// function Banner(props) {
//   const ref = useRef();
//   const texture = useTexture('https://picsum.photos/800');
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   // const scroll = useScroll();
//   useFrame((state, delta) => {
//     ref.current.material.time.value += Math.abs(0) * 4;
//     ref.current.material.map.offset.x += delta / 2;
//   });
//   return (
//     <mesh ref={ref} {...props}>
//       <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
//       <meshSineMaterial
//         map={texture}
//         map-anisotropy={16}
//         map-repeat={[30, 1]}
//         side={THREE.DoubleSide}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// }
