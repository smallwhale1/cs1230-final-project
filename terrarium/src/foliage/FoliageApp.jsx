import { Box, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Sky from "./Sky";
import { Tree } from "./Tree";
import Ground from "./Ground";
import LTree from "./l-system/LTree";
import * as THREE from "three";
import { MdOutlineWbSunny, MdSunny } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import GlassSphere from "./GlassSphere";
import ReactAudioPlayer from "react-audio-player";
import { AudioListener, Audio, AudioLoader } from "three";

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

const SceneAudio = () => {
  const { camera } = useThree();
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // create a global audio source
  const sound = new THREE.Audio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("/models/Dear_Katara.ogg", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });

  return null; // Nothing needs to be rendered by this component
};

const FoliageApp = () => {
  const [activeMode, setActiveMode] = useState("summer");
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
        {/* {activeMode === "summer" ? <Tree /> : <LTree />} */}
        {/* <LTree /> */}
        <Tree />
        {/* Ground */}
        <GlassSphere />
        <Ground />
        {/* <ReactAudioPlayer
          src="/models/dear_katara.ogg"
          autoPlay
          controls
        /> */}
        <SceneAudio />
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
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setActiveMode("summer")}
          className="icon-btn"
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            backgroundColor: activeMode === "summer" ? "#ec4899" : "#f1f5f9",
            color: activeMode === "summer" ? "#ffffff" : "#94a3b8",
          }}
        >
          <MdSunny />
        </button>
        <button
          onClick={() => setActiveMode("winter")}
          className="icon-btn"
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            backgroundColor: activeMode === "winter" ? "#ec4899" : "#f1f5f9",
            color: activeMode === "winter" ? "#ffffff" : "#94a3b8",
          }}
        >
          <FaRegSnowflake />
        </button>
      </div>
    </div>
  );
};

export default FoliageApp;
