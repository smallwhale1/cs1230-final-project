import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const GlassSphere = () => {
  const { size, scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    const hdrEquirect = new RGBELoader().load("assets/room.hdr", () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
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
    mesh.scale.set(4.8, 4.8, 4.8);
    mesh.position.y += 2;

    scene.add(mesh);
  }, []);

  return <></>;
};

export default GlassSphere;
