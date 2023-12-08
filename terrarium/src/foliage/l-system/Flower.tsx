import { Clone, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

type Props = {
  position: Vector3;
};

const Flower = ({ position }: Props) => {
  const flower = useGLTF("assets/flower.glb");
  return (
    <group name="flower" position={position} onClick={() => {}} scale={1.0}>
      <Clone receiveShadow castShadow object={flower.scene} />
    </group>
  );
};

export default Flower;
