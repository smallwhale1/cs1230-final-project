import { Clone, useGLTF } from "@react-three/drei";
import { FoliageMaterial } from "./FoliageMaterial";
import { Euler, MeshStandardMaterial, Vector3, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export function Tree({ position, rotation }) {
  const tree = useGLTF("https://douges.dev/static/tree.glb");

  const barkTexture = useLoader(TextureLoader, "/textures/bark_texture.png");
  const normalMap = useLoader(TextureLoader, "/textures/bark_normal.png");
  const roughnessMap = useLoader(TextureLoader, "/textures/bark_roughness.png");
  const displacementMap = useLoader(
    TextureLoader,
    "/textures/bark_displacement.png"
  );

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
      onClick={() => {}}
      scale={1.1}
    >
      <Clone
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
      <Clone
        receiveShadow
        castShadow
        object={tree.nodes.foliage}
        inject={<FoliageMaterial />}
      />
    </group>
  );
}
