import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, FrontSide, MeshStandardMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vert from "./vertex.glsl.js";

// Tree colors: "#65b231"

interface Props {
  color: string;
  windSpeed: number;
}
export function FoliageMaterial({ color, windSpeed }: Props) {
  const ref = useRef(null);
  const alphaMap = useTexture("/assets/foliage-texture.jpg");

  const uniforms = useMemo(
    () => ({
      windSpeed: { value: windSpeed },
      windTime: { value: 0.0 },
    }),
    [windSpeed]
  );

  useFrame((_, dt) => {
    if (!ref.current) return;
    const refObj = ref.current as any;
    refObj.uniforms.windTime.value += refObj.uniforms.windSpeed.value * dt;
  });

  return (
    <CustomShaderMaterial
      alphaMap={alphaMap}
      alphaTest={0.3}
      baseMaterial={MeshStandardMaterial}
      color={new Color(color).convertLinearToSRGB()}
      ref={ref}
      uniforms={uniforms}
      vertexShader={vert}
      shadowSide={FrontSide}
    />
  );
}
