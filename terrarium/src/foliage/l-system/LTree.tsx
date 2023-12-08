import { Cylinder, Line } from "@react-three/drei";
import { Turtle, applyRules } from "./generator";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {};

const TreeGenerator = () => {
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

  const generateTree = () => {
    const axiom = "X";
    const rules = {
      F: "FX[FX[+XF]]",
      X: "FF[+XZ++X-F[+ZX]][-X+F-X]",
      Z: "[+F-X-F][++ZX]",
    };

    const iterations = 3;

    // Generate the L-system string
    let currentString = axiom;
    for (let i = 0; i < iterations; i++) {
      currentString = applyRules(currentString, rules);
    }

    drawTree(currentString);
  };

  const drawTree = (generationString: string) => {
    // variables
    const turnAngleX = -Math.PI / 9;
    const turnAngleZ = Math.PI / 10;
    const drawLength = 0.15;

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      // angles
      angleX: Math.PI / 2,
      angleY: -Math.PI / 2,
      angleZ: 0,
    };

    const stack: Turtle[] = [];
    const newObjects = [];

    for (let i = 0; i < generationString.length; i++) {
      const current = generationString[i];
      switch (current) {
        case "F":
          // forward
          const newX = turtle.x + Math.cos(turtle.angleX) * drawLength;
          const newY = turtle.y + Math.sin(turtle.angleX) * drawLength;
          const newZ = turtle.z + Math.sin(turtle.angleZ) * drawLength;
          // draw
          newObjects.push(
            <Line
              points={[
                [turtle.x, turtle.y, turtle.z],
                [newX, newY, newZ],
              ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
              color="black" // Default
              lineWidth={2} // In pixels (default)
              segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
              dashed={false} // Default
            />
          );
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
    <group>
      {objects}
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
