
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { red } from '@mui/material/colors';
import { useThree } from '@react-three/fiber';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { PerspectiveCamera } from '@react-three/drei';

function MyThree() {


 const{scene, gl, camera} = useThree();
  const refContainer = useRef(null);


  const initializeScene = (container) => {
    // Scene, Camera, Renderer
    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // container.appendChild(renderer.domElement);

    // Particle System
    var particles = new THREE.BufferGeometry();
    var particleMaterial = new THREE.PointsMaterial({ color: "rgb(255,255,255)", size: .05, emissive: "rgb(255,255,255)" });

    console.log("hi");

    var particlesCount = 25;
    var particlesPositions = new Float32Array(particlesCount * 3);
    var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());
    var lastResetTimes = new Array(particlesCount).fill(0);

    // Function to reset particle positions
    const resetParticle = (index) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3;
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

        // Setup bloom effect
        const composer = new EffectComposer(gl);
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new EffectPass(camera, new BloomEffect());
        bloomPass.renderToScreen = true;
        composer.addPass(renderPass);
        composer.addPass(bloomPass);


    // // Camera Position
    // camera.position.z = 5;

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

        if (particlesPositions[i * 3 + 1] < 0.2) {
            // Adjust the y-coordinate to be above 0.2
            particlesPositions[i * 3 + 1] = 0.21 +particlesVelocities[i].y;;
          }

        if (particleRadius > 3) {
          particlesPositions[i * 3] /= particleRadius / 3;
          particlesPositions[i * 3 + 1] /= particleRadius / 3;
          particlesPositions[i * 3 + 2] /= particleRadius / 3;
        }

        // Check if it's time to reset this particle
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastResetTimes[i]) / 1000; // Convert to seconds

        if (elapsedTime > Math.random() * (7 - 4) + 4) {
          resetParticle(i);
        }
      }

      particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
      //composer.render();
      composer.render();
    };
    
    //setInitializeCounter(initializeCounter + 1);
    animate();
  };

   useEffect(() => {
  //   setTimeout(() => {
  //     initializeScene(refContainer.current);
  //   }, 2000)
    // if (refContainer.current) {
     initializeScene(refContainer.current);
    // }
  }, [scene, gl, camera]);


//   return <div ref={refContainer}></div>;
}

export default MyThree;