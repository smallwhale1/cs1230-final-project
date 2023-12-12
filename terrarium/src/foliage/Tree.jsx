import { Clone, useGLTF } from "@react-three/drei";
import { FoliageMaterial } from "./FoliageMaterial";
import { Euler, Vector3 } from "three";
import { useEffect } from "react";
import * as THREE from "three";

const original = "https://douges.dev/static/tree.glb";
export function Tree({ position, rotation }) {
  const tree = useGLTF("https://douges.dev/static/tree.glb");
  const tree2 = useGLTF("/assets/untitled.glb");

  useEffect(() => {
    console.log(tree.nodes);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const mesh = new THREE.Mesh(geometry, material);
  }, [tree]);

  return (
    <group
      name="tree"
      rotation={rotation}
      position={position}
      onClick={() => {}}
      scale={1}
    >
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.trunk}
        inject={<meshBasicMaterial color="#533232" />}
      />
      <Clone
        position={[-1.2, 3, 0]}
        receiveShadow
        castShadow
        object={tree.nodes.foliage}
        inject={<FoliageMaterial />}
      />
      {/* <Clone
        receiveShadow
        castShadow
        object={tree.nodes.foliage1}
        inject={<FoliageMaterial />}
      />
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.foliage2}
        inject={<FoliageMaterial />}
      />
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.foliage3}
        inject={<FoliageMaterial />}
      /> */}
    </group>
  );
}
