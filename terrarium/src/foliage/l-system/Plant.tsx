import { Cylinder, Line, useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { MeshBasicMaterial, Vector3 } from "three";
import { Turtle, applyRules } from "./generator";
import * as THREE from "three";

type Props = {};

interface ParameterizedSymbol {
  symbol: string;
  params: number[];
}

const Plant = (props: Props) => {
  const [objects, setObjects] = useState<JSX.Element[]>([]);

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
    // const iterations = 12;
    // const r1 = 0.55;
    // const r2 = 0.95;
    // const a1 = -5;
    // const a2 = 30;
    // const y1 = 137;
    // const y2 = 137;
    // const w0 = 5;
    // const q = 0.4;
    // const e = 0.0;
    // const min = 0.5;

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

    const iterations = 9;
    const r1 = 0.5;
    const r2 = 0.85;
    const a1 = 25;
    const a2 = -15;
    const y1 = 180;
    const y2 = 0;
    const w0 = 20;
    const q = 0.45;
    const e = 0.5;
    const min = 0.5;

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

    console.log(currAxiom);
    drawSystem(currAxiom);
  };

  const degToRad = (deg: number): number => {
    return deg * (Math.PI / 180.0);
  };

  const drawSystem = (symbols: ParameterizedSymbol[]) => {
    const stack: Turtle[] = [];
    const newObjects = [];

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      // angles
      yaw: 0,
      pitch: 0,
      roll: 0,
    };
    for (let i = 0; i < symbols.length; i++) {
      const current = symbols[i];
      switch (current.symbol) {
        case "F":
          const a = new THREE.Euler(
            turtle.yaw,
            turtle.pitch,
            turtle.roll,
            "XYZ"
          );
          const b = new THREE.Vector3(0, 1, 0);
          b.applyEuler(a);
          b.normalize();

          const initPoint = new THREE.Vector3(turtle.x, turtle.y, turtle.z);
          const finalPoint = new THREE.Vector3();
          finalPoint.copy(initPoint);
          finalPoint.addScaledVector(b, current.params[0]);

          newObjects.push(
            <Line
              points={[initPoint, finalPoint]}
              color="#000000" // Default
              lineWidth={1} // In pixels (default)
            />
          );

          // update state
          turtle.x = finalPoint.x;
          turtle.y = finalPoint.y;
          turtle.z = finalPoint.z;
          break;
        case "+":
          // Turn right
          turtle.yaw += degToRad(current.params[0]);
          break;
        case "-":
          // Turn left
          turtle.yaw -= degToRad(current.params[0]);
          break;
        case "/":
          turtle.pitch += degToRad(current.params[0]);
          break;
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
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
          turtle.yaw = state.yaw;
          turtle.pitch = state.pitch;
          turtle.roll = state.roll;
          break;
        default:
          break;
      }
    }

    setObjects(newObjects);
  };

  const drawTree = (generationString: string) => {
    const stack: Turtle[] = [];
    const newObjects = [];
    // variables
    const turnAngleX = -Math.PI / 10;
    const drawLengthX = 0.3;

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      // angles
      yaw: 0,
      pitch: 0,
      roll: 0,
    };
    // const a = new THREE.Euler(0, 0, Math.PI / 4, "XYZ");
    // const b = new THREE.Vector3(0, 1, 0);
    // b.applyEuler(a);
    // const initPoint = new THREE.Vector3(0, 0, 0);
    // const finalPoint = new THREE.Vector3();
    // initPoint.copy(finalPoint);
    // finalPoint.addScaledVector(b, 5);

    // newObjects.push(
    //   <Line
    //     points={[initPoint, finalPoint]}
    //     color="#000000" // Default
    //     lineWidth={2} // In pixels (default)
    //   />
    // );

    // if the location is not saved, it is the last branch there

    for (let i = 0; i < generationString.length; i++) {
      const current = generationString[i];
      switch (current) {
        case "F":
          const a = new THREE.Euler(
            turtle.yaw,
            turtle.pitch,
            turtle.roll,
            "XYZ"
          );
          const b = new THREE.Vector3(0, 1, 0);
          b.applyEuler(a);
          b.normalize();

          const initPoint = new THREE.Vector3(turtle.x, turtle.y, turtle.z);
          const finalPoint = new THREE.Vector3();
          finalPoint.copy(initPoint);
          finalPoint.addScaledVector(b, drawLengthX);

          newObjects.push(
            <Line
              points={[initPoint, finalPoint]}
              color="#000000" // Default
              lineWidth={1} // In pixels (default)
            />
          );

          // update state
          turtle.x = finalPoint.x;
          turtle.y = finalPoint.y;
          turtle.z = finalPoint.z;
          break;
        case "+":
          // Turn right
          turtle.yaw += turnAngleX; // Adjust the angle as needed
          break;
        case "-":
          // Turn left
          turtle.yaw -= turnAngleX; // Adjust the angle as needed
          break;
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
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
          turtle.yaw = state.yaw;
          turtle.pitch = state.pitch;
          turtle.roll = state.roll;
          break;
      }
    }

    setObjects(newObjects);
  };

  useEffect(() => {
    generatePlant();
    // generateSnowflake();
    // generateTree();
  }, []);
  return <group>{objects}</group>;
};

export default Plant;
