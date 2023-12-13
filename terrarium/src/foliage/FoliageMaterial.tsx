import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, FrontSide, MeshStandardMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vert from "./vertex.glsl.js";

// Tree colors: "#65b231"

interface Props {
  color: string;
}
export function FoliageMaterial({ color }: Props) {
  const ref = useRef(null);
  const alphaMap = useTexture("/assets/foliage-texture.jpg");

  useFrame((_, delta) => {
    if (!ref.current) return;
    const refObj = ref.current as any;
    refObj.uniforms.u_windTime.value +=
      refObj.uniforms.u_windSpeed.value * delta;
  });

  const uniforms = useMemo(
    () => ({
      u_effectBlend: { value: 1.0 },
      u_inflate: { value: 0.0 },
      u_scale: { value: 1.0 },
      u_windSpeed: { value: 1.0 },
      u_windTime: { value: 0.0 },
    }),
    []
  );

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
