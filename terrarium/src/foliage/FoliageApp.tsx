import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Sky from "./Sky";

type Props = {};

const FoliageApp = (props: Props) => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "transparent",
        }}
        camera={{ near: 0.1, far: 1000 }}
      >
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.8} />
        <hemisphereLight groundColor={"#000000"} intensity={1} />
        <Sky />
        <mesh rotation={[0, 10, 0]}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default FoliageApp;
