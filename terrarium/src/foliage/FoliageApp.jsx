import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Sky from "./Sky";
import { Tree } from "./Tree";
import Ground from "./Ground";
import * as THREE from "three";
import GlassSphere from "./GlassSphere";
import { AudioListener, Audio, AudioLoader } from "three";
import Plant from "./l-system/Plant";
import MyThree from "../particles/particleapp";

const SceneAudio = () => {
  const { camera } = useThree();
  const listener = new AudioListener();
  camera.add(listener);

  // create a global audio source
  const sound = new Audio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load("/models/Dear_Katara.ogg", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });

  return null; // Nothing needs to be rendered by this component
};

const FoliageApp = () => {
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
        <Tree />
        <GlassSphere setSceneLoaded={setSceneLoaded} />
        <Plant lSystemState={{ angle: 30 }} />
        <Ground />
        <MyThree />
        {/* <SceneAudio /> */}
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
        <OrbitControls
          onChange={(e) => {
            setCameraPosition(e.target.object.position);
          }}
        />
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

export default FoliageApp;
