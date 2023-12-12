import { Cylinder } from "@react-three/drei";
import React from "react";
import { MeshBasicMaterial, Vector3 } from "three";

type Props = {};

const Plant = (props: Props) => {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 5]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Plant;
