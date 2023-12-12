import { useGLTF } from "@react-three/drei";
import React from "react";

const Sky = () => {
  const sky = useGLTF("assets/skybox.glb");
  return (
    <mesh>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
