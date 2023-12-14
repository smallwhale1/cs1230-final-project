import { useGLTF } from "@react-three/drei";

const Sky = () => {
  const sky = useGLTF("assets/skybox.glb");
  return (
    <mesh rotation={[0, 2, 0]}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
