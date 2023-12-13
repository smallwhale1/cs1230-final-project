import { Cylinder, Line, useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { MeshBasicMaterial, Vector3 } from "three";
import { Turtle, TurtleSimple, applyRules } from "./generator";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

type Props = {};

interface ParameterizedSymbol {
  symbol: string;
  params: number[];
}

const xOffset = -1.9;
const yOffset = 0.2;
const zOffset = 0.25;

const degToRad = (deg: number): number => {
  return deg * (Math.PI / 180.0);
};

const cylinderMesh = (pointX: Vector3, pointY: Vector3) => {
  // edge from X to Y
  var direction = new THREE.Vector3().subVectors(pointY, pointX);
  const material = new THREE.MeshStandardMaterial({ color: "#5f8034" });
  // Make the geometry (of "direction" length)
  var geometry = new THREE.CylinderGeometry(
    0.002,
    0.002,
    direction.length(),
    6,
    4,
    false
  );
  // shift it so one end rests on the origin
  geometry.applyMatrix4(
    new THREE.Matrix4().makeTranslation(0, direction.length() / 2, 0)
  );
  // rotate it the right way for lookAt to work
  geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(degToRad(90)));
  // Make a mesh with the geometry
  var mesh = new THREE.Mesh(geometry, material);
  // Position it where we want
  mesh.position.copy(pointX);
  // And make it point to where we want
  mesh.lookAt(pointY);

  mesh.position.x += xOffset;
  mesh.position.y += yOffset;
  mesh.position.z += zOffset;

  return mesh;
};

const Plant = (props: Props) => {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const pot = useGLTF("assets/pot.glb");
  const { scene } = useThree();
  const leaf = useGLTF("assets/leaf.glb");

  useEffect(() => {
    console.log("pot", pot.nodes);
    generatePlant();
  }, []);

  const placeSphere = (point: Vector3) => {
    const r = 0.04;
    const geometry = new THREE.SphereGeometry(r, 5, 5, 0, 1.2, 0);
    const material = new THREE.MeshStandardMaterial({ color: "#7fe04f" });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.y -= r / 2;
    sphere.position.x += point.x;
    sphere.position.y += point.y;
    sphere.position.z += point.z;

    scene.add(sphere);
  };

  const generateSnowflake = () => {
    const iterations = 3;
    const axiom: ParameterizedSymbol[] = [
      { symbol: "F", params: [1] },
      { symbol: "-", params: [120] },
      { symbol: "F", params: [1] },
      { symbol: "-", params: [120] },
      { symbol: "F", params: [1] },
    ];

    let currAxiom = axiom;

    for (let j = 0; j < iterations; j++) {
      let newAxiom: ParameterizedSymbol[] = [];
      for (let i = 0; i < currAxiom.length; i++) {
        const current = currAxiom[i];
        if (current.symbol == "F") {
          newAxiom.push(
            { symbol: "F", params: [current.params[0] / 3] },
            { symbol: "+", params: [60] },
            { symbol: "F", params: [current.params[0] / 3] },
            { symbol: "-", params: [120] },
            { symbol: "F", params: [current.params[0] / 3] },
            { symbol: "+", params: [60] },
            { symbol: "F", params: [current.params[0] / 3] }
          );
        } else {
          newAxiom.push(current);
        }
      }

      currAxiom = newAxiom;
    }

    drawSystem(currAxiom);
  };

  const generatePlant = () => {
    // initialize params
    const iterations = 10;
    const r1 = 0.55;
    const r2 = 0.95;
    const a1 = -5;
    const a2 = 30;
    const y1 = 137;
    const y2 = 137;
    const w0 = 5;
    const q = 0.4;
    const e = 0.0;
    const min = 0.5;

    // initialize params
    // const iterations = 10;
    // const r1 = 0.75;
    // const r2 = 0.77;
    // const a1 = 20;
    // const a2 = -20;
    // const y1 = 0;
    // const y2 = 0;
    // const w0 = 30;
    // const q = 0.5;
    // const e = 0.4;
    // const min = 0.0;

    // const iterations = 9;
    // const r1 = 0.5;
    // const r2 = 0.85;
    // const a1 = 25;
    // const a2 = -15;
    // const y1 = 180;
    // const y2 = 0;
    // const w0 = 20;
    // const q = 0.45;
    // const e = 0.5;
    // const min = 0.5;

    const axiom: ParameterizedSymbol[] = [{ symbol: "A", params: [100, w0] }];

    // Generate the L-system string
    let currAxiom = axiom;
    for (let j = 0; j < iterations; j++) {
      let newAxiom: ParameterizedSymbol[] = [];
      for (let i = 0; i < currAxiom.length; i++) {
        const current = currAxiom[i];
        if (current.symbol == "A" && current.params[0] >= min) {
          newAxiom.push(
            { symbol: "!", params: [current.params[1]] },
            { symbol: "F", params: [current.params[0]] },
            { symbol: "[", params: [] },
            {
              symbol: "+",
              params: [a1],
            },
            {
              symbol: "/",
              params: [y1],
            },
            {
              symbol: "A",
              params: [current.params[0] * r1, current.params[1] * q ** e],
            },
            { symbol: "]", params: [] },
            { symbol: "[", params: [] },
            {
              symbol: "+",
              params: [a2],
            },
            {
              symbol: "/",
              params: [y2],
            },
            {
              symbol: "A",
              params: [
                current.params[0] * r2,
                current.params[1] * (1 - q) ** e,
              ],
            },
            { symbol: "]", params: [] }
          );
        } else {
          newAxiom.push(current);
        }
      }
      currAxiom = newAxiom;
    }

    drawSystem(currAxiom);
  };

  const drawSystem = (symbols: ParameterizedSymbol[]) => {
    const stack: Turtle[] = [];
    // const newObjects = [];
    const scale = 0.0015;

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      front: new Vector3(0, 1, 0),
      out: new Vector3(0, 0, 1),
      // angle
      yaw: 0,
      pitch: 0,
      roll: 0,
    };
    for (let i = 0; i < symbols.length; i++) {
      const current = symbols[i];

      switch (current.symbol) {
        case "F":
          const initPoint = new THREE.Vector3(turtle.x, turtle.y, turtle.z);
          const finalPoint = new THREE.Vector3();
          finalPoint.copy(initPoint);
          finalPoint.addScaledVector(turtle.front, current.params[0] * scale);

          const mesh = cylinderMesh(initPoint, finalPoint);
          scene.add(mesh);

          //   newObjects.push(
          //     <Line
          //       points={[initPoint, finalPoint]}
          //       color="#254620" // Default
          //       lineWidth={1} // In pixels (default)
          //     />
          //   );

          //   newObjects.push(
          //     <Cylinder position={[0, 0.5, 0]} scale={[0.1, 0.1, 1]} />
          //   );

          // update state
          turtle.x = finalPoint.x;
          turtle.y = finalPoint.y;
          turtle.z = finalPoint.z;
          break;
        case "+": {
          // Turn right
          const newFront = new Vector3(
            turtle.front.x,
            turtle.front.y,
            turtle.front.z
          );

          newFront.applyAxisAngle(turtle.out, degToRad(current.params[0]));

          const newOut = new Vector3(turtle.out.x, turtle.out.y, turtle.out.z);

          newOut.applyAxisAngle(turtle.out, degToRad(current.params[0]));

          turtle.front = newFront;
          turtle.out = newOut;
          break;
        }
        case "-":
          // Turn left
          turtle.yaw -= degToRad(current.params[0]);
          break;
        case "/": {
          const newFront = new Vector3(
            turtle.front.x,
            turtle.front.y,
            turtle.front.z
          );

          newFront.applyAxisAngle(turtle.front, degToRad(current.params[0]));
          const newOut = new Vector3(turtle.out.x, turtle.out.y, turtle.out.z);

          newOut.applyAxisAngle(turtle.front, degToRad(current.params[0]));

          turtle.front = newFront;
          turtle.out = newOut;
          //   turtle.pitch += degToRad(current.params[0]);
          break;
        }
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
            front: turtle.front,
            out: turtle.out,
            yaw: turtle.yaw,
            pitch: turtle.pitch,
            roll: turtle.roll,
          });
          break;
        case "]":
          // Pop state from stack
          const state = stack.pop();
          if (!state) return;
          turtle.x = state.x;
          turtle.y = state.y;
          turtle.z = state.z;
          turtle.front = state.front;
          turtle.out = state.out;
          turtle.yaw = state.yaw;
          turtle.pitch = state.pitch;
          turtle.roll = state.roll;
          break;
        default:
          break;
      }
    }

    // setObjects(newObjects);
  };

  return (
    <mesh scale={0.4} position={[xOffset, yOffset - 0.6, zOffset]}>
      <primitive object={pot.nodes.pCylinder1} />
    </mesh>
  );
};

export default Plant;
