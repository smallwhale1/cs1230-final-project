import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { OrbitControls, Box, Plane } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { Canvas, useThree } from "@react-three/fiber";
import SceneContainer from "./SceneContainer";
import MyThree from "./particles/particleapp";

function SkyBox() {
  // highlight-start
  const { scene } = useThree();
  const loader = new THREE.CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "public/skybox/skybox_px.jpg",
    "public/skybox/skybox_nx.jpg",
    "public/skybox/skybox_py.jpg",
    "public/skybox/skybox_ny.jpg",
    "public/skybox/skybox_pz.jpg",
    "public/skybox/skybox_nz.jpg",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  // highlight-end
  return null;
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas>
       <SceneContainer />
      </Canvas>
    </div>
  );
}
export default App;
