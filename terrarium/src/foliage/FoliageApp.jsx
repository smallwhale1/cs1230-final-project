import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Sky from "./Sky";
import { Color, MathUtils } from "three";
import { Tree } from "./Tree";

const FoliageApp = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "transparent",
        }}
        // camera={{ near: 0.1, far: 1000 }}
      >
        <Tree />
        {/* Ground */}
        <mesh
          name="ground"
          rotation={[MathUtils.degToRad(-90), 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[3, 50]} />
          <meshStandardMaterial
            color={new Color("#88f95f").convertLinearToSRGB()}
          />
        </mesh>
        <hemisphereLight
          color="#f85555"
          intensity={1.0}
          groundColor="#362907"
        />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <ambientLight intensity={1.0} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* <pointLight position={[-10, 0, -20]} color="#eef4aa" intensity={0.5} /> */}
        <PerspectiveCamera
          far={2000}
          fov={80}
          makeDefault
          near={0.1}
          position={[0, 4, 10]}
        />
        <OrbitControls />
        <Sky />
        {/* <mesh rotation={[0, 10, 0]}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh> */}
      </Canvas>
    </div>
  );
};

export default FoliageApp;
