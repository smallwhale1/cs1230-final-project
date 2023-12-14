import * as THREE from "three";
import { Clone, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Turtle } from "./generator";
import { useThree } from "@react-three/fiber";

type Props = {
  lSystemState: LSystemControls;
};

export interface LSystemControls {
  angle: number;
}

interface ParameterizedSymbol {
  symbol: string;
  params: number[];
}

const degToRad = (deg: number): number => {
  return deg * (Math.PI / 180.0);
};

// Constants
const offsetVector: Vector3 = new Vector3(-1.9, 0.2, 0.25);
const scaleBack = 0.75;

const Plant = ({ lSystemState }: Props) => {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const pot = useGLTF("assets/pot.glb");
  const leafy = useGLTF("assets/leafy.glb");
  const { scene } = useThree();
  const currentGeometries = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (currentGeometries.current) {
      currentGeometries.current.forEach((elem) => {
        scene.remove(elem);
      });
    }
    generatePlant();
  }, [lSystemState, scene]);

  const makeCylinder = (pointX: Vector3, pointY: Vector3, w: number) => {
    // edge from X to Y
    var direction = new THREE.Vector3().subVectors(pointY, pointX);
    const material = new THREE.MeshStandardMaterial({ color: "#5f8034" });
    // Make the geometry (of "direction" length)
    var geometry = new THREE.CylinderGeometry(
      w * scaleBack,
      w,
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

    mesh.position.x += offsetVector.x;
    mesh.position.y += offsetVector.y;
    mesh.position.z += offsetVector.z;
    currentGeometries.current.push(mesh);
    scene.add(mesh);
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
    const a2 = lSystemState.angle;
    const y1 = 137;
    const y2 = 137;
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

    drawSystem(currAxiom);
  };

  const drawSystem = (symbols: ParameterizedSymbol[]) => {
    const stack: Turtle[] = [];
    const newObjects = [];
    const scale = 0.0015;

    // Set up state
    let turtle: Turtle = {
      x: 0,
      y: 0,
      z: 0,
      width: 0.01,
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

          makeCylinder(initPoint, finalPoint, turtle.width);
          turtle.width = turtle.width * scaleBack;

          const elements = [0, 1, 2, 3];
          const randomElement =
            elements[Math.floor(Math.random() * elements.length)];
          const dist = new Vector3(0, 0, 0).distanceTo(finalPoint);

          if (dist >= 0.5) {
            console.log("more");
            if (dist >= 1 || Math.random() < 0.5) {
              newObjects.push(
                <Clone
                  scale={0.2}
                  rotation={[0, randomElement * ((2 * Math.PI) / 4), 0]}
                  position={
                    new Vector3(
                      finalPoint.x + offsetVector.x,
                      finalPoint.y + offsetVector.y,
                      finalPoint.z + offsetVector.z
                    )
                  }
                  object={leafy.scene}
                />
              );
            }
          }

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
          break;
        }
        case "[":
          // Push current state to stack
          stack.push({
            x: turtle.x,
            y: turtle.y,
            z: turtle.z,
            width: turtle.width,
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
          turtle.width = state.width;
          turtle.out = state.out;
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

  return (
    <group>
      <mesh
        scale={0.4}
        position={[offsetVector.x, offsetVector.y - 0.6, offsetVector.z]}
      >
        <primitive object={pot.nodes.pCylinder1} />
      </mesh>
      {objects}
    </group>
  );
};

export default Plant;
