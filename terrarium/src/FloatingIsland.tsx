import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Color, Mesh, MeshStandardMaterial, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingIsland = () => {
  // thanks to https://polyhaven.com/textures !
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/pebbles.glb"
  );

  useEffect(() => {
    if (!gltf) return;

    gltf.scene.traverse((object) => {
      if (object.isObject3D) {
        const mesh = object as Mesh;
        //   var uvs = mesh.geometry.attributes.uv.array;
        //   mesh.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));

        if (mesh.material instanceof MeshStandardMaterial) {
          // mesh.material.lightMap = mesh.material.map;
          // mesh.material.lightMapIntensity = 100;
          mesh.material.color = new Color(0.8, 0.9, 0.9);
        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

export default FloatingIsland;
