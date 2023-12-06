import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { OrbitControls, Box, Plane } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE
import { Canvas, useThree } from '@react-three/fiber';



function SkyBox() {
  // highlight-start
  const { scene } = useThree();
  const loader = new THREE.CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    'public/skybox/skybox_px.jpg',
    'public/skybox/skybox_nx.jpg',
    'public/skybox/skybox_py.jpg',
    'public/skybox/skybox_ny.jpg',
    'public/skybox/skybox_pz.jpg',
    'public/skybox/skybox_nz.jpg',
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  // highlight-end
  return null;
}

function App() {

  
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]}>
        <meshStandardMaterial color={'orange'} />
      </Box>
      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial color={'blue'} />
      </Box>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={new THREE.CircleGeometry(5, 32)} attach="geometry" />
          <meshStandardMaterial color={'lightblue'} />
        </mesh>
      <OrbitControls />
      <SkyBox/>
    </Canvas>
  </div>
  );
}
export default App;