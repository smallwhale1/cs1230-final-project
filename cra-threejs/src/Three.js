
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function MyThree() {
  const refContainer = useRef(null);

  const initializeScene = (container) => {
    // Scene, Camera, Renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particle System
    var particles = new THREE.BufferGeometry();
    var particleMaterial = new THREE.PointsMaterial({ color:  0xFFFFFF, size: 0.1 });

    var particlesCount = 25;
    var particlesPositions = new Float32Array(particlesCount * 3);
    var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());
    var lastResetTimes = new Array(particlesCount).fill(0);

    // Function to reset particle positions
    const resetParticle = (index) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.5;
      particlesPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlesPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlesPositions[index * 3 + 2] = radius * Math.cos(phi);
      lastResetTimes[index] = Date.now();
    };

    // Initial particle position setup
    for (let i = 0; i < particlesCount; i++) {
      resetParticle(i);
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    var particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);


    // Camera Position
    camera.position.z = 5;

    // Animation Loop
    var animate = function () {
      requestAnimationFrame(animate);

      // Update Particle Motion (Firefly-like motion)
      for (let i = 0; i < particlesCount; i++) {
        particlesVelocities[i].x += (Math.random() - 0.5) * 0.01;
        particlesVelocities[i].y += (Math.random() - 0.5) * 0.01;
        particlesVelocities[i].z += (Math.random() - 0.5) * 0.01;

        particlesPositions[i * 3] += particlesVelocities[i].x;
        particlesPositions[i * 3 + 1] += particlesVelocities[i].y;
        particlesPositions[i * 3 + 2] += particlesVelocities[i].z;

        const particleRadius = Math.sqrt(
          particlesPositions[i * 3] ** 2 +
          particlesPositions[i * 3 + 1] ** 2 +
          particlesPositions[i * 3 + 2] ** 2
        );

        if (particleRadius > 1.5) {
          particlesPositions[i * 3] /= particleRadius / 1.5;
          particlesPositions[i * 3 + 1] /= particleRadius / 1.5;
          particlesPositions[i * 3 + 2] /= particleRadius / 1.5;
        }

        // Check if it's time to reset this particle
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastResetTimes[i]) / 1000; // Convert to seconds

        if (elapsedTime > Math.random() * (7 - 4) + 4) {
          resetParticle(i);
        }
      }

      particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

      renderer.render(scene, camera);
    };
    animate();
  };

  useEffect(() => {
    if (refContainer.current) {
      initializeScene(refContainer.current);
    }
  }, []);

  return <div ref={refContainer}></div>;
}

export default MyThree;