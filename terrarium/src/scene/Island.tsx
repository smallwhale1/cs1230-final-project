import Stats from "stats.js";
import { useRef } from "react";
import { CircleGeometry, TextureLoader, Vector2, Vector3 } from "three";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Water } from "./water/Water2";
import { useFrame } from "@react-three/fiber";

extend({ Water });

type Props = {};

const MainScene = () => {
  // thanks to https://polyhaven.com/textures !
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/terrarium-w-butterfly.glb"
  );

  useEffect(() => {
    if (!gltf) return;

    gltf.scene.traverse((object) => {
      if (object.isObject3D) {
        const mesh = object as Mesh;
        if (mesh.name === "wings") {
          mesh.visible = false;
        }
      } else if (object) {
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

    object.position.y -= 1.0;

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

const MyComponentWithStats = () => {
  const stats = useRef(new Stats());

  useEffect(() => {
    stats.current.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.current.dom);

    return () => {
      document.body.removeChild(stats.current.dom);
    };
  }, []);

  useFrame(() => {
    stats.current.begin();
    // monitored code goes here
    stats.current.end();
  });
};

const SceneAdjustments = (props: Props) => {
  MyComponentWithStats();
  const { scene } = useThree();
  const object = scene.getObjectByName("bench");
  console.log("looking for bench, ", object);
  if (object) {
    object.position.y -= 1.7;
  }

  const pond = scene.getObjectByName("Ellipse_4");
  if (pond) {
    pond.position.y -= 1.7;
  }

  const diffuseMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/rock_diffuse.jpg"
  );
  const normalMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/rock_normal.jpg"
  );
  const aoRoughMetalMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/rock_ao.jpg"
  );

  const floorMat = new MeshStandardMaterial({
    map: diffuseMap,
    normalMap: normalMap,
    aoMap: aoRoughMetalMap,
    roughnessMap: aoRoughMetalMap,
    metalnessMap: aoRoughMetalMap,
  });
  const rock = scene.getObjectByName("big_rocks");

  if (rock) {
    const rock1 = rock.children[0];
    const rock2 = rock.children[1];
    const rock3 = rock.children[2];

    if (rock1 && rock1 instanceof Mesh) {
      rock1.material = floorMat;
    }
    if (rock2 && rock2 instanceof Mesh) {
      rock2.material = floorMat;
    }
    if (rock3 && rock3 instanceof Mesh) {
      rock3.material = floorMat;
    }
  }

  const wings = scene.getObjectByName("wings");
  if (wings) {
    console.log("bf found");
  }
};

const Ground = (props: Props) => {
  SceneAdjustments([]);

  return (
    <>
      <MainScene />
      <WaterComponent />
    </>
  );
};

export default Ground;
