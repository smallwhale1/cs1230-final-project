import { Cylinder } from "@react-three/drei";
import React from "react";
import { Turtle, applyRules } from "./generator";

type Props = {};

const LTree = (props: Props) => {
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

  return (
    <group>
      <Cylinder
        args={[0.3, 0.2]}
        position={[0, 1, 0]}
        material-color={"#000000"}
      />
      <Cylinder
        args={[0.2, 0.3]}
        position={[0, 2, 0]}
        material-color={"#000000"}
      />
    </group>
  );
};

export default LTree;
