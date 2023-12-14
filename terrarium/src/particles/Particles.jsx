import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
// import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';

function MyThree() {
  const { scene, gl, camera } = useThree();
  const refContainer = useRef(null);
  const spriteTexture = useLoader(THREE.TextureLoader, "/textures/glow.png");
  const sprites = useRef([]);
  const velocities = useRef([]);

  const initializeScene = () => {
    const particlesCount = 10;
    const radius = 3;
    const scale = 0.1;

    for (let i = 0; i < particlesCount; i++) {
      // Create sprite material with the loaded texture
      const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });

      // Create a sprite
      const sprite = new THREE.Sprite(spriteMaterial);

      // Position the sprite
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      sprite.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      sprite.scale.set(scale, scale, scale);

      // Add the sprite to the scene
      sprites.current.push(sprite);
      velocities.current.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001
        )
      );
      scene.add(sprite);
    }

    var animate = function () {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      sprites.current.forEach((sprite, index) => {
        const velocity = velocities.current[index];

        sprite.position.x += velocity.x;
        sprite.position.y += velocity.y;
        sprite.position.z += velocity.z;

        // Randomly adjust velocity
        velocity.x += (Math.random() - 0.5) * 0.001;
        velocity.y += (Math.random() - 0.5) * 0.001;
        velocity.z += (Math.random() - 0.5) * 0.001;

        // Keep within a radius
        const distance = sprite.position.length();
        if (distance > radius || sprite.position.y < 0.2) {
          sprite.position.normalize().multiplyScalar(radius * Math.random());
          velocities.current[index] = new THREE.Vector3(
            (Math.random() - 0.5) * 0.001,
            Math.abs(Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.001
          ); // Slowed down reset velocities
        }
      });
    };

    animate();
  };

  useEffect(() => {
    initializeScene(refContainer.current);
  }, [scene, gl, camera]);

  //   return <div ref={refContainer}></div>;
  return null;
}

export default MyThree;
