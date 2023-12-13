import { Clone, useGLTF } from "@react-three/drei";
import { FoliageMaterial } from "./FoliageMaterial";
import { Euler, MeshStandardMaterial, Vector3, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

export function Tree({ position, rotation }) {
  const tree = useGLTF("https://douges.dev/static/tree.glb");

  const barkTexture = useLoader(TextureLoader, "/textures/bark_texture.png");
  const normalMap = useLoader(TextureLoader, "/textures/bark_normal.png");
  const roughnessMap = useLoader(TextureLoader, "/textures/bark_roughness.png");
  const displacementMap = useLoader(
    TextureLoader,
    "/textures/bark_displacement.png"
  );

  useEffect(() => {}, []);

  // const trunkMat = MeshStandardMaterial(
  // map={barkTexture},
  // normalMap={normalMap},
  // roughnessMap={roughnessMap},
  // displacementMap={displacementMap},
  // roughness=0.5,
  // metalness=0,
  // );

  return (
    <group
      name="tree"
      rotation={rotation}
      position={position}
      onPointerDown={() => {
        console.log("click!!");
      }}
      scale={1}
    >
      <Clone
        scale={0.9}
        receiveShadow
        castShadow
        object={tree.nodes.trunk}
        inject={
          <meshStandardMaterial
            color={"#473105"}
            // map={barkTexture}
            // normalMap={normalMap}
            // roughnessMap={roughnessMap}
            // displacementMap={displacementMap}
            roughness={0.9}
            envMapIntensity={0.2}
            metalness={0}
          />
        }
      />
      <group position={[0.1, 0.8, 0]}>
        <Clone
          position={[-2, 2, 0.2]}
          scale={0.3}
          receiveShadow
          castShadow
          object={tree.nodes.foliage}
          inject={<FoliageMaterial color={"#db4e89"} />}
        />
        <Clone
          position={[-1.5, 2, 0.2]}
          scale={1}
          receiveShadow
          castShadow
          object={tree.nodes.foliage}
          inject={<FoliageMaterial color={"#f25395"} />}
        />
        <Clone
          position={[-0.7, 3.5, 0]}
          scale={0.3}
          receiveShadow
          castShadow
          object={tree.nodes.foliage}
          inject={<FoliageMaterial color={"#ff5da1"} />}
        />
        <Clone
          position={[-0.2, 3.5, 0]}
          scale={0.3}
          receiveShadow
          castShadow
          object={tree.nodes.foliage}
          inject={<FoliageMaterial color={"#fe5ea1"} />}
        />
        <Clone
          position={[0.5, 2.2, 0]}
          scale={0.4}
          receiveShadow
          castShadow
          object={tree.nodes.foliage}
          inject={<FoliageMaterial color={"#ff5da1"} />}
        />
      </group>
    </group>
  );
}
