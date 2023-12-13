import React, { useRef } from "react";
import {
  Box3,
  BufferGeometry,
  CircleGeometry,
  Clock,
  EllipseCurve,
  MathUtils,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
  BufferAttribute,
  Color,
  Mesh,
  MeshStandardMaterial,
  Object3D,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
// import { Water } from 'Water2.js'
import { Water } from "./Water2";
import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";

extend({ Water });

type Props = {};

const MainScene = () => {
  // thanks to https://polyhaven.com/textures !
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/terrarium-coloring.glb"
  );

  useEffect(() => {
    if (!gltf) return;

    gltf.scene.traverse((object) => {
      console.log(object.name, object.type); // Log the name and type of each object

      if (object.isObject3D) {
        const mesh = object as Mesh;

        // Handle mesh-specific logic
        // if (mesh.material instanceof MeshStandardMaterial) {
        //   mesh.material.color = new Color(0.8, 0.9, 0.9);
        // }
      } else if (object) {
        // Handle group-specific logic
        console.log("Group found: ", object);
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

const WaterComponent = (props: Props) => {
  var waterGeometry = new CircleGeometry(1.562, 30);

  const flowMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/water/Water_1_M_Flow.jpg"
  );
  var water = new Water(waterGeometry, {
    color: "#ffffff",
    scale: 4,
    flowDirection: new Vector2(1.0, 1.0),
    textureWidth: 1024,
    textureHeight: 1024,
    flowMap: flowMap,
  });
  const { scene } = useThree();

  const object = scene.getObjectByName("Ellipse_4");
  if (object && object instanceof Mesh && object.material && object.geometry) {
    // Create the water using the mesh's geometry
    // waterGeometry = object.geometry; // If you want to use the mesh's geometry
    // Or create a new PlaneGeometry with the size of the bounding box
    // waterGeometry = object.geometry.clone();

    water = new Water(waterGeometry, {
      color: "#ffffff",
      scale: 3,
      flowDirection: new Vector2(1.0, 1.0),
      textureWidth: 1024,
      textureHeight: 1024,
      flowMap: flowMap,
    });
    console.log("local ", object.position);

    object.position.y -= 1.4;

    var target = new Vector3(0, 0, 0);
    const ret = object.getWorldPosition(target);
    console.log("world ", ret);
  }

  return (
    object &&
    object instanceof Mesh &&
    object.material &&
    object.geometry && (
      <primitive
        object={water}
        position={[-0.7399999926239252, 0.001, -0.66368191229517947]}
        rotation={[-Math.PI / 2, 0, 0]}
        // rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        // scale={0.01}
        {...props}
      />
    )
  );
};

const SceneAdjustments = (props: Props) => {
  const { scene } = useThree();
  const object = scene.getObjectByName("bench");
  console.log("looking for bench, ", object);
  if (object) {
    object.position.y -= 1.7;
  }
  // if (object && object instanceof Mesh && object.material && object.geometry) {

  // }
};

const Ground = (props: Props) => {
  SceneAdjustments([]);

  return (
    <>
      {/* <mesh
        name="ground"
        rotation={[MathUtils.degToRad(-90), 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[2, 50]} />
        <meshStandardMaterial
          color={new Color("#88f95f").convertLinearToSRGB()}
        />
      </mesh> */}
      <MainScene />
      <WaterComponent />
    </>
  );
};

export default Ground;
