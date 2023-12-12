import React, { useRef } from "react";
import { Box3, BufferGeometry, CircleGeometry, Clock, EllipseCurve, MathUtils, PlaneGeometry, ShaderMaterial, TextureLoader, Vector2, Vector3 } from "three";
import { extend, useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { BufferAttribute, Color, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
// import { Water } from 'Water2.js'
import { Water } from "./Water2";
import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";


extend({ Water }); 

type Props = {};

const SceneS = (props: Props) => {
  const { nodes, materials } = useSpline('https://prod.spline.design/pF53X7i59Dq6xQR9/scene.splinecode')
  return (
    <>
      <color attach="background" args={['#74757a']} />
      <group {...props} dispose={null}>
        <scene name="Scene 1" scale={0.05}>
          <group name="bench" position={[102.95, 8.99, -181.75]} rotation={[0, -0.64, 0]} scale={0.3}>
            <group name="container" position={[0, 1.12, 18.09]}>
              <mesh
                name="Sphere 3"
                geometry={nodes['Sphere 3'].geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[102.51, 105.22, -46.35]}
                scale={0.84}
              />
              <mesh
                name="Sphere 2"
                geometry={nodes['Sphere 2'].geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[-102.31, 105.22, -46.35]}
                scale={0.84}
              />
              <mesh
                name="Sphere 31"
                geometry={nodes['Sphere 31'].geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[102.51, 132.21, -54.24]}
                scale={0.84}
              />
              <mesh
                name="Sphere"
                geometry={nodes.Sphere.geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[-102.31, 132.21, -54.24]}
                scale={0.84}
              />
              <mesh
                name="Rectangle 4"
                geometry={nodes['Rectangle 4'].geometry}
                material={materials.wood}
                castShadow
                receiveShadow
                position={[0, 57.93, 53.71]}
                rotation={[-1.37, 0, 0]}
                scale={0.84}
              />
              <mesh
                name="Rectangle 3"
                geometry={nodes['Rectangle 3'].geometry}
                material={materials.wood}
                castShadow
                receiveShadow
                position={[-0.46, 59.21, 23.17]}
                rotation={[-1.63, 0, Math.PI]}
                scale={0.84}
              />
              <mesh
                name="Rectangle 6"
                geometry={nodes['Rectangle 6'].geometry}
                material={materials.wood}
                castShadow
                receiveShadow
                position={[0.2, 126.38, -64.71]}
                rotation={[-0.39, 0, 0]}
                scale={0.84}
              />
              <mesh
                name="Rectangle 5"
                geometry={nodes['Rectangle 5'].geometry}
                material={materials.wood}
                castShadow
                receiveShadow
                position={[0.2, 102.2, -49.84]}
                rotation={[3.02, 0, Math.PI]}
                scale={0.84}
              />
              <mesh
                name="Rectangle 2"
                geometry={nodes['Rectangle 2'].geometry}
                material={materials.wood}
                castShadow
                receiveShadow
                position={[0.2, 62.6, -14.15]}
                rotation={[1.48, 0, 0]}
                scale={0.84}
              />
              <mesh
                name="Cylinder 2"
                geometry={nodes['Cylinder 2'].geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[-0.19, 36.3, -29.25]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                scale={0.84}
              />
              <mesh
                name="Cylinder"
                geometry={nodes.Cylinder.geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[-0.19, 36.3, 50.04]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                scale={0.84}
              />
              <mesh
                name="matel"
                geometry={nodes.matel.geometry}
                material={materials.grey}
                castShadow
                receiveShadow
                position={[105.39, 48.71, -42.48]}
                scale={0.84}
              />
            </group>
          </group>
          <group name="grond" position={[-33.11, 6.61, -13.33]} rotation={[-Math.PI, 0.02, -Math.PI]} scale={0.38}>
            <mesh
              name="Shape 4"
              geometry={nodes['Shape 4'].geometry}
              material={materials.plant}
              castShadow
              receiveShadow
              position={[-422.7, -9.18, 24.36]}
              rotation={[-Math.PI / 2, 0, -0.51]}
            />
            <mesh
              name="Shape 5"
              geometry={nodes['Shape 5'].geometry}
              material={materials.plant}
              castShadow
              receiveShadow
              position={[-108.56, -9.18, 360.87]}
              rotation={[-Math.PI / 2, 0, 0.4]}
            />
            <mesh
              name="Shape 3"
              geometry={nodes['Shape 3'].geometry}
              material={materials.plant}
              castShadow
              receiveShadow
              position={[-211.9, -9.18, 207.46]}
              rotation={[-Math.PI / 2, 0, 0.4]}
            />
            <mesh
              name="Shape 2"
              geometry={nodes['Shape 2'].geometry}
              material={materials.plant}
              castShadow
              receiveShadow
              position={[-489.05, -9.18, 98.97]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <group
              name="Gress_01"
              position={[-98.85, -11.68, 355.25]}
              rotation={[-Math.PI, 1.32, -Math.PI]}
              scale={0.6}
            >
              <mesh
                name="Cube 39"
                geometry={nodes['Cube 39'].geometry}
                material={materials.plant}
                castShadow
                receiveShadow
                position={[43.47, 12.34, 41.47]}
                rotation={[-1.38, -1.24, -1.56]}
                scale={0.42}
              />
              <mesh
                name="Cube 391"
                geometry={nodes['Cube 391'].geometry}
                material={materials.plant}
                castShadow
                receiveShadow
                position={[-43.2, 7.94, -23.12]}
                rotation={[-0.39, -0.81, 0.27]}
                scale={0.42}
              />
              <mesh
                name="Cube 392"
                geometry={nodes['Cube 392'].geometry}
                material={materials.plant}
                castShadow
                receiveShadow
                position={[37.8, 9.02, 19.49]}
                rotation={[-0.39, -0.81, -0.3]}
                scale={0.42}
              />
              <mesh
                name="Cube 40"
                geometry={nodes['Cube 40'].geometry}
                material={materials.pink}
                castShadow
                receiveShadow
                position={[-29.65, 7.99, 25.07]}
                rotation={[-2.6, -1.37, -3]}
                scale={0.49}
              />
              <mesh
                name="Cube 393"
                geometry={nodes['Cube 393'].geometry}
                material={materials.pink}
                castShadow
                receiveShadow
                position={[25.94, 18.96, 37.26]}
                rotation={[2.54, -1.23, 1.54]}
                scale={0.49}
              />
            </group>
            <mesh
              name="Rock road_02"
              geometry={nodes['Rock road_02'].geometry}
              material={materials['brick-plant']}
              castShadow
              receiveShadow
              position={[-545.09, -4.5, 189.53]}
            />
            <mesh
              name="Rock road_021"
              geometry={nodes['Rock road_021'].geometry}
              material={materials['brick-plant']}
              castShadow
              receiveShadow
              position={[-58.42, -4.5, -243.28]}
            />
            <group name="Rock road_01" position={[439.58, -15.9, -15.97]}>
              <mesh
                name="stone"
                geometry={nodes.stone.geometry}
                material={materials['brick-plant']}
                castShadow
                receiveShadow
                position={[0, 3.16, 0]}
              />
            </group>
          </group>
          <mesh
            name="grass covering"
            geometry={nodes['grass covering'].geometry}
            material={nodes['grass covering'].material}
            castShadow
            receiveShadow
            position={[-20.13, -26.03, 6.2]}
          />
          <mesh
            name="Ellipse 4"
            geometry={nodes['Ellipse 4'].geometry}
            material={materials['Ellipse 4 Material']}
            castShadow
            receiveShadow
            position={[-33, -25.68, -133.68]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group name="big rocks" position={[142.93, 12.19, 136.75]}>
            <mesh
              name="Lathe 2"
              geometry={nodes['Lathe 2'].geometry}
              material={materials['Lathe 2 Material']}
              castShadow
              receiveShadow
              position={[31.57, 0, 4.94]}
              rotation={[-2.91, 0.75, -3.01]}
              scale={[0.99, 0.57, 1.32]}
            />
            <mesh
              name="Lathe 3"
              geometry={nodes['Lathe 3'].geometry}
              material={materials['Lathe 3 Material']}
              castShadow
              receiveShadow
              position={[-31.57, -35.2, -20.8]}
              rotation={[-1.36, 0.28, 2.34]}
              scale={[0.77, 0.67, 1.03]}
            />
            <mesh
              name="Lathe"
              geometry={nodes.Lathe.geometry}
              material={materials['Lathe Material']}
              castShadow
              receiveShadow
              position={[-56, -1.96, 37.16]}
              rotation={[-2.91, 0.75, 2.97]}
              scale={[0.77, 0.44, 1.03]}
            />
          </group>
          <group name="stone1" position={[86.58, 0, 96.22]} rotation={[0, 0.9, 0]} scale={0.09}>
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials.stone}
              castShadow
              receiveShadow
              position={[-583.59, 88.33, 1168.56]}
              rotation={[-1.56, -0.06, -2.73]}
              scale={1.4}
            />
            <mesh
              name="Cube 5"
              geometry={nodes['Cube 5'].geometry}
              material={materials.stone}
              castShadow
              receiveShadow
              position={[665.69, -65.05, 284.32]}
              rotation={[-0.74, -0.06, 1.67]}
              scale={1}
            />
            <mesh
              name="Cube 8"
              geometry={nodes['Cube 8'].geometry}
              material={materials.stone}
              castShadow
              receiveShadow
              position={[-1480.03, 18.76, -136.28]}
              rotation={[-0.61, 0.01, 0.69]}
              scale={1}
            />
            <mesh
              name="Cube 3"
              geometry={nodes['Cube 3'].geometry}
              material={materials.stone}
              castShadow
              receiveShadow
              position={[454.44, -50.3, 45.54]}
              rotation={[-2.19, -0.11, 0.91]}
              scale={1}
            />
            <mesh
              name="Cube 2"
              geometry={nodes['Cube 2'].geometry}
              material={materials.stone}
              castShadow
              receiveShadow
              position={[-866.83, -22.42, -685.03]}
              rotation={[-2.52, 1.16, -2.01]}
              scale={1}
            />
            <group name="Group" position={[1326.34, -94.81, 753.77]}>
              <mesh
                name="Cube1"
                geometry={nodes.Cube1.geometry}
                material={materials.stone}
                castShadow
                receiveShadow
                position={[-12.53, 25.88, -46.49]}
                rotation={[-2.33, 0.95, 1.21]}
                scale={1}
              />
            </group>
          </group>
          <mesh
            name="Ellipse 3"
            geometry={nodes['Ellipse 3'].geometry}
            material={materials['Ellipse 3 Material']}
            castShadow
            receiveShadow
            position={[-3, -12, 6]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[1.8, 1.85, 1.8]}
          />
          {/* <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[191.66, 249.36, -255.59]}
            rotation={[3.09, 0.67, 3.06]}
            scale={1}
          /> */}
          {/* <OrthographicCamera name="1" makeDefault={true} far={10000} near={-50000} /> */}
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
        </scene>
      </group>
    </>
  )
}

const BasicScene = () => {
  // thanks to https://polyhaven.com/textures !
  const gltf = useLoader(GLTFLoader, '/models/terrarium-complex.glb')
  return <primitive object={gltf.scene} />
 }


const Pebbles = () => {
 // thanks to https://polyhaven.com/textures !
 const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/terrarium-coloring.glb");

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

 return (
   <primitive object={gltf.scene} />
 )
}


const WaterComponent = (props: Props) => {
  // var waterGeometry = new PlaneGeometry( 1.5, 2.4);
  
  var waterGeometry = new CircleGeometry( 1.562, 30);

  const flowMap = useLoader(TextureLoader, process.env.PUBLIC_URL + "/water/Water_1_M_Flow.jpg");
  var water = new Water( waterGeometry, {
    color: '#ffffff',
    scale: 4,
    flowDirection: new Vector2(1.0, 1.0 ),
    textureWidth: 1024,
    textureHeight: 1024,
    flowMap: flowMap
  } );
  const { scene } = useThree();

  
  const object = scene.getObjectByName("Ellipse_4");
  if (object && object instanceof Mesh && object.material && object.geometry) {

    // Create the water using the mesh's geometry
    // waterGeometry = object.geometry; // If you want to use the mesh's geometry
    // Or create a new PlaneGeometry with the size of the bounding box
    // waterGeometry = object.geometry.clone();

    water = new Water( waterGeometry, {
      color: '#ffffff',
      scale: 3,
      flowDirection: new Vector2(1.0, 1.0 ),
      textureWidth: 1024,
      textureHeight: 1024,
      flowMap: flowMap
    } );
    console.log('local ', object.position)

    object.position.y -= 1.2;

    var target = new Vector3(0,0,0)
    const ret = object.getWorldPosition(target)
    console.log('world ', ret)
  }


  return (
    (object && object instanceof Mesh && object.material && object.geometry &&

    <primitive
      object={water}
      position={[-0.7399999926239252,-0.0001,-0.66368191229517947]}
      rotation={[-Math.PI / 2, 0, 0]}
      // rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      // scale={0.01}
      {...props}
    />)
  );

};

const Ground = (props: Props) => {
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
      <WaterComponent />
      <Pebbles />
      {/* <SceneS /> */}
      {/* <BasicScene /> */}
    </>
  );
};

export default Ground;
