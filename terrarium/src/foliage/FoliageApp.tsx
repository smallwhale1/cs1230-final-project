import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Sky from "./Sky";
import { Tree } from "./Tree";
import Ground from "./Ground";
import * as THREE from "three";
import GlassSphere from "./GlassSphere";
import Plant, { LSystemControls } from "./l-system/Plant";
import Gui from "./Gui";
import { Slider } from "@mui/material";

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
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(0, 4, 12)
  );
  const [sceneloaded, setSceneLoaded] = useState(false);
  const [refraction, setRefraction] = useState(0.1);
  const [lsystemState, setLSystemState] = useState<LSystemControls>({
    angle1: 30,
    angle2: -5,
    width: 1,
    height: 2,
    leafChance: 0.5,
  });

  return (
    <div
      className="container"
      style={{
        // opacity: sceneloaded ? 1 : 0,
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
        {/* <VanillaWrapper /> */}
        {/* {activeMode === "summer" ? <Tree /> : <LTree />} */}
        {/* <Tree /> */}
        {/* <GlassSphere refraction={refraction} setSceneLoaded={setSceneLoaded} /> */}
        <Plant lSystemState={lsystemState} />
        {/* <Ground /> */}
        {/* <ReactAudioPlayer
          src="/models/dear_katara.ogg"
          autoPlay
          controls
        /> */}
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
        <ambientLight intensity={1.0} />
        <pointLight position={[-10, 0, -20]} color="#eef4aa" intensity={0.5} />
        {/* Controls */}
        <PerspectiveCamera
          far={2000}
          fov={80}
          makeDefault
          near={0.1}
          position={cameraPosition}
        />
        <OrbitControls
          keys={{
            LEFT: "ArrowLeft", //left arrow
            UP: "ArrowUp", // up arrow
            RIGHT: "ArrowRight", // right arrow
            BOTTOM: "ArrowDown", // down arrow
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
      >
        <div
          style={{
            width: 200,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {/* Angle 1 */}
          <label>Rotation Paramter 1</label>
          <Slider
            onChange={(e, val) => {
              setLSystemState((prev) => ({ ...prev, angle1: val as number }));
            }}
            size="small"
            step={2}
            min={10}
            max={40}
            value={lsystemState.angle1}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          {/* Angle 2 */}
          <label>Rotation Paramter 2</label>
          <Slider
            onChange={(e, val) => {
              setLSystemState((prev) => ({ ...prev, angle2: val as number }));
            }}
            size="small"
            min={-20}
            max={-5}
            value={lsystemState.angle2}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <label>Leaf Chance </label>
          <Slider
            onChange={(e, val) => {
              setLSystemState((prev) => ({
                ...prev,
                leafChance: val as number,
              }));
            }}
            size="small"
            min={0.2}
            max={0.6}
            step={0.1}
            value={lsystemState.leafChance}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FoliageApp;
