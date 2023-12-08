import React from "react";
import { Color, MathUtils } from "three";

type Props = {};

const Ground = (props: Props) => {
  return (
    <mesh
      name="ground"
      rotation={[MathUtils.degToRad(-90), 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[3, 50]} />
      <meshStandardMaterial
        color={new Color("#88f95f").convertLinearToSRGB()}
      />
    </mesh>
  );
};

export default Ground;
