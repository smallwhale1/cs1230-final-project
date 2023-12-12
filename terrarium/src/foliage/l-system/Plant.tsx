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
    const iterations = 4;
    // initialize params
    const min = 0;
    const r1 = 0;
    const w = 0;
    const q = 0;
    const e = 0;
    const a1 = 0;
    const yaw1 = 0;

    const axiom: ParameterizedSymbol[] = [{ symbol: "A", params: [100, 0] }];
    const rules = {};

    // Generate the L-system string
    let currAxiom = axiom;
    let seenA = true;
    while (seenA) {
      let newAxiom: ParameterizedSymbol[] = [];
      let count = 0;
      for (let i = 0; i < currAxiom.length; i++) {
        const current = currAxiom[i];
        if (current.symbol == "A") {
          if (current.params[0] >= min) {
            count += 1;
            newAxiom = [
              ...newAxiom,
              // ignore !(w) for now
              { symbol: "F", params: [current.params[0]] },
              { symbol: "[", params: [] },
              {
                symbol: "+",
                params: [a1],
              },
              {
                symbol: "/",
                params: [yaw1],
              },
              {
                symbol: "A",
                params: [current.params[0] * r1, w * q ** e],
              },
              { symbol: "]", params: [] },
              { symbol: "[", params: [] },
              {
                symbol: "+",
                params: [a1],
              },
              {
                symbol: "/",
                params: [yaw1],
              },
              {
                symbol: "A",
                params: [current.params[0] * r1, w * (1 - q) ** e],
              },
              { symbol: "[", params: [] },
            ];
          }
        } else {
          newAxiom.push(current);
        }
      }
      if (count == 0) {
        seenA = false;
      }
      currAxiom = newAxiom;
    }
  };

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

    currentString = currentString
      .split("")
      .filter((char) => !["Z", "X"].includes(char))
      .join("");
    drawTree(currentString);
  };

  const degToRad = (deg: number): number => {
    return deg * (Math.PI / 180.0);
  };

  const drawSystem = (symbols: ParameterizedSymbol[]) => {
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
    generateSnowflake();
    // generateTree();
  }, []);
  return <group>{objects}</group>;
};

export default Plant;
