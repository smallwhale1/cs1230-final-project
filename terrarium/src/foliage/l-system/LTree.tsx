import { Clone, Cylinder, Line, Sphere, useGLTF } from "@react-three/drei";
import { Turtle, applyRules } from "./generator";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FoliageMaterial } from "../FoliageMaterial";

type Props = {};

export const TreeGenerator = () => {
  const { size, scene } = useThree();

  const generateTree = () => {
    const axiom = "X";
    const rules = {
      F: "FX[FX[+XF]]",
      X: "FF[+XZ++X-F[+ZX]][-X++F-X]",
      Z: "[+F-X-F][++ZX]",
    };

    const iterations = 4;

    // Generate the L-system string
    let currentString = axiom;
    for (let i = 0; i < iterations; i++) {
      currentString = applyRules(currentString, rules);
    }

    drawTree(currentString);
  };

  const drawTree = (generationString: string) => {
    // variables
    const turnAngle = Math.PI / 9;
    const drawLength = 2;

    // Set up state
    let turtle: Turtle = {
      x: 50,
      y: 200,
      z: 0,
      // angles
      angleX: -Math.PI / 2,
      angleY: -Math.PI / 2,
      angleZ: -Math.PI / 2,
    };

    const stack: Turtle[] = [];

    for (let i = 0; i < generationString.length; i++) {
      const current = generationString[i];
      switch (current) {
        case "F":
          // forward
          const newX = turtle.x + Math.cos(turtle.angleX) * drawLength;
          const newY = turtle.y + Math.sin(turtle.angleX) * drawLength;
          // draw

          // update state
          turtle.x = newX;
          turtle.y = newY;
          break;
        case "+":
          // Turn right
          turtle.angleX += turnAngle; // Adjust the angle as needed
          break;
        case "-":
          // Turn left
          turtle.angleX -= turnAngle; // Adjust the angle as needed
          break;
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
            angleX: turtle.angleX,
            angleY: turtle.angleY,
            angleZ: turtle.angleZ,
          });
          break;
        case "]":
          // Pop state from stack
          const state = stack.pop();
          if (!state) return;
          turtle.x = state.x;
          turtle.y = state.y;
          turtle.angleX = state.angleX;
          break;
      }
    }
  };

  useEffect(() => {
    // vanilla test
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }, []);

  return <></>;
};

const LTree = (props: Props) => {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const tree = useGLTF("https://douges.dev/static/tree.glb");

  const generateTree = () => {
    const axiom = "X";
    const rules = {
      F: "FX[FX[+XF]]",
      X: "F+F-[+X-Z++X-F[+ZX]][-X+F-X]",
      Z: "[+F-X-F][++ZX]",
    };

    const iterations = 3;

    // Generate the L-system string
    let currentString = axiom;
    for (let i = 0; i < iterations; i++) {
      currentString = applyRules(currentString, rules);
    }

    currentString = currentString
      .split("")
      .filter((char) => !["Z", "X"].includes(char))
      .join("");
    console.log(currentString);

    drawTree(currentString);
  };

  //   const positionCylinder = () => {
  //     // Assuming you have a line defined by two Vector3 points: startPoint and endPoint
  //     const startPoint = new THREE.Vector3(x1, y1, z1);
  //     const endPoint = new THREE.Vector3(x2, y2, z2);

  //     // Calculate the length and direction of the line
  //     const length = startPoint.distanceTo(endPoint);
  //     const direction = new THREE.Vector3()
  //       .subVectors(endPoint, startPoint)
  //       .normalize();

  //     // Create a cylinder geometry
  //     const cylinderGeometry = new THREE.CylinderBufferGeometry(
  //       radius,
  //       radius,
  //       length,
  //       radialSegments
  //     );

  //     // Create a cylinder material
  //     const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  //     // Create a cylinder mesh
  //     const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  //     // Position the cylinder at the midpoint of the line
  //     cylinderMesh.position.copy(
  //       startPoint.clone().add(endPoint).multiplyScalar(0.5)
  //     );

  //     // Orient the cylinder along the line using the lookAt method
  //     cylinderMesh.lookAt(endPoint);

  //     // Add the cylinder to the scene
  //     scene.add(cylinderMesh);
  //   };

  const drawTree = (generationString: string) => {
    // variables
    const turnAngleX = -Math.PI / 10;
    const turnAngleZ = Math.PI / 10;
    const drawLengthX = 0.3;
    const drawLengthZ = 0.1;
    const shortDrawLengthX = 0.001;
    const shortDrawLengthZ = 0.001;

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      // angles
      angleX: Math.PI / 2 + 0.2,
      angleY: -Math.PI / 2,
      angleZ: 0,
    };

    const stack: Turtle[] = [];
    const newObjects = [];

    // if the location is not saved, it is the last branch there

    for (let i = 0; i < generationString.length; i++) {
      const current = generationString[i];
      let newX = 0;
      let newY = 0;
      let newZ = 0;
      switch (current) {
        case "F":
          newX = turtle.x + Math.cos(turtle.angleX) * drawLengthX;
          newY = turtle.y + Math.sin(turtle.angleX) * drawLengthX;
          newZ = turtle.z + Math.sin(turtle.angleZ) * drawLengthZ;
          //   if (
          //     i != generationString.length - 1 &&
          //     generationString[i + 1] != "["
          //   ) {
          //     // forward
          //     newX = turtle.x + Math.cos(turtle.angleX) * shortDrawLengthX;
          //     newY = turtle.y + Math.sin(turtle.angleX) * shortDrawLengthX;
          //     newZ = turtle.z + Math.sin(turtle.angleZ) * shortDrawLengthZ;
          //   } else {
          //     // forward
          //     newX = turtle.x + Math.cos(turtle.angleX) * drawLengthX;
          //     newY = turtle.y + Math.sin(turtle.angleX) * drawLengthX;
          //     newZ = turtle.z + Math.sin(turtle.angleZ) * drawLengthZ;
          //   }

          // draw
          newObjects.push(
            // <Cylinder args={[1, 1]} position={} rotation={}/>
            <Line
              points={[
                [turtle.x, turtle.y, turtle.z],
                [newX, newY, newZ],
              ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
              color="#733b3b" // Default
              lineWidth={2} // In pixels (default)
              segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
              dashed={false} // Default
            />
          );

          //   if (
          //     i != generationString.length - 1 &&
          //     generationString[i + 1] != "["
          //   ) {
          //     newObjects.push(
          //       // <Cylinder args={[1, 1]} position={} rotation={}/>
          //       <Sphere position={[newX, newY, newZ]} args={[0.01]} />
          //     );
          //   }
          // update state
          turtle.x = newX;
          turtle.y = newY;
          turtle.z = newZ;
          break;
        case "+":
          // Turn right
          turtle.angleX += turnAngleX; // Adjust the angle as needed
          turtle.angleZ += turnAngleZ;
          break;
        case "-":
          // Turn left
          turtle.angleX -= turnAngleX; // Adjust the angle as needed
          turtle.angleZ -= turnAngleZ;
          break;
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
            angleX: turtle.angleX,
            angleY: turtle.angleY,
            angleZ: turtle.angleZ,
          });
          break;
        case "]":
          // Pop state from stack
          const state = stack.pop();
          if (!state) return;
          turtle.x = state.x;
          turtle.y = state.y;
          turtle.z = state.z;
          turtle.angleX = state.angleX;
          break;
      }
    }

    setObjects(newObjects);
  };

  useEffect(() => {
    generateTree();
    // wait until flower loads potentially
  }, []);
  return (
    <group position={[1, 0, -1]}>
      {objects}
      {/* <Clone
        scale={1.5}
        position={[-1.5, 3.6, 0]}
        receiveShadow
        castShadow
        object={tree.nodes.foliage}
        inject={<FoliageMaterial />}
      /> */}
      {/* <TreeGenerator /> */}
      {/* <Line
        points={[
          [0, 0, 0],
          [0, 1, 0],
        ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
        color="black" // Default
        lineWidth={2} // In pixels (default)
        segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
        dashed={false} // Default
      /> */}
      {/* <Cylinder
        args={[0.3, 0.2]}
        position={[0, 1, 0]}
        material-color={"#000000"}
      />
      <Cylinder
        args={[0.2, 0.3]}
        position={[0, 2, 0]}
        material-color={"#000000"}
      /> */}
    </group>
  );
};

export default LTree;
