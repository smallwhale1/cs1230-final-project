import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import Sky from "./Sky";
import { Tree } from "./Tree";
import Ground from "./Ground";
import LTree from "./l-system/LTree";
import * as THREE from "three";

const VanillaWrapper = () => {
  const { size, scene } = useThree();

  useEffect(() => {
    // vanilla test
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }, []);
};

const FoliageApp = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "transparent",
        }}
      >
        {/* <VanillaWrapper /> */}
        <LTree />
        {/* <Tree /> */}
        {/* Ground */}
        <Ground />
        <Sky />
        {/* Lights */}
        <hemisphereLight
          color="#f85555"
          intensity={1.0}
          groundColor="#362907"
        />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={1.0} />
        <pointLight position={[-10, 0, -20]} color="#eef4aa" intensity={0.5} />
        {/* Controls */}
        <PerspectiveCamera
          far={2000}
          fov={80}
          makeDefault
          near={0.1}
          position={[0, 4, 10]}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default FoliageApp;
