import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Tree } from "./scene/foliage/Tree";
import Sky from "./scene/Sky";
import Ground from "./scene/Island";
import GlassSphere from "./scene/GlassSphere";
import Plant from "./l-system/LSystemPlant";
import MyThree from "./particles/Particles";

const App = () => {
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(0, 4, 12)
  );
  const [sceneloaded, setSceneLoaded] = useState(false);

  return (
    <div
      className="container"
      style={{
        opacity: sceneloaded ? 1 : 0,
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "transparent",
        }}
      >
        {/* Objects */}
        <Tree />
        <GlassSphere setSceneLoaded={setSceneLoaded} />
        <Plant lSystemState={{ angle: 30 }} />
        <Ground />
        <MyThree />
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
        <ambientLight intensity={0.8} />
        {/* Controls */}
        <PerspectiveCamera
          far={2000}
          fov={80}
          makeDefault
          near={0.1}
          position={cameraPosition}
        />
        <OrbitControls />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "8px",
        }}
      ></div>
    </div>
  );
};

export default App;
