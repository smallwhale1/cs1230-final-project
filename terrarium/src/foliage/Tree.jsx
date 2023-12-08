import { Clone, useGLTF } from "@react-three/drei";
import { FoliageMaterial } from "./FoliageMaterial";
import { Euler, Vector3 } from "three";

export function Tree({ position, rotation }) {
  const tree = useGLTF("https://douges.dev/static/tree.glb");

  return (
    <group
      name="tree"
      rotation={rotation}
      position={position}
      onClick={() => {}}
      scale={1.2}
    >
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.trunk}
        inject={<meshBasicMaterial color="black" />}
      />
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.foliage}
        inject={<FoliageMaterial />}
      />
    </group>
  );
}
