import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const GlassSphere = () => {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    const hdrEquirect = new RGBELoader().load("assets/room.hdr", () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    });
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0.0,
      transmission: 1.01,
      thickness: 0.8, // refract
      // ior: 1.5,
      // reflectivity: 0.5,
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
