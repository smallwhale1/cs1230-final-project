import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, FrontSide, MeshStandardMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vert from "./vertex2.glsl.js";

const original = "https://douges.dev/static/foliage_alpha3.png";
// Tree colors: "#65b231"
export function FoliageMaterial() {
  const ref = useRef(null);
  const alphaMap = useTexture("/assets/foliage1.jpg");

  useFrame((_, delta) => {
    if (!ref.current) return;
    const refObj = ref.current as any;
    refObj.uniforms.u_windTime.value +=
      refObj.uniforms.u_windSpeed.value * delta;
  });

  const uniforms = useMemo(
    () => ({
      u_effectBlend: { value: 1 },
      u_inflate: { value: 0.2 },
      u_scale: { value: 0 },
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
      color={new Color("#ff5da1").convertLinearToSRGB()}
      ref={ref}
      uniforms={uniforms}
      vertexShader={vert}
      shadowSide={FrontSide}
    />
  );
}
