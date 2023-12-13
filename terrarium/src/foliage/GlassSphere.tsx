import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

interface Props {
  setSceneLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlassSphere = ({ setSceneLoaded }: Props) => {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    const hdrEquirect = new RGBELoader().load("assets/meadow.hdr", () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      setSceneLoaded(true);
    });
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0.05,
      transmission: 1,
      thickness: 0.1, // refract
      // ior: 1.1,
      // reflectivity: 0.1,
      envMap: hdrEquirect,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(5.2, 5.2, 5.2);
    mesh.position.y += 2;

    scene.add(mesh);
  }, []);

  return <></>;
};

export default GlassSphere;
