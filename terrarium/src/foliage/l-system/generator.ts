import { Vector3 } from "three";

export interface TurtleSimple {
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  roll: number;
}

// maybe keep track of how many lines drawn so far
export interface Turtle {
  x: number;
  y: number;
  z: number;
  front: Vector3;
  out: Vector3;
  width: number;
  yaw: number;
  pitch: number;
  roll: number;
}

export const applyRules = (sentence: string, rules: any) => {
  let result = "";
  for (let i = 0; i < sentence.length; i++) {
    const current = sentence[i];
    const replacement = rules[current] || current; // Use the rule or keep the character
    result += replacement;
  }
  return result;
};
