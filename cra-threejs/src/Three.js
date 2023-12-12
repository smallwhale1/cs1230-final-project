// import * as THREE from 'three';
// import { useEffect, useRef } from "react";

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;
// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 1000;
//     var particlesPositions = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount; i++) {
//       particlesPositions[i * 3] = (Math.random() - 0.5) * 10;
//       particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
//       particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Particle Motion
//       particleSystem.rotation.x += 0.01;
//       particleSystem.rotation.y += 0.01;

//       // Cube Rotation
//       // cube.rotation.x += 0.01;
//       // cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;
// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 25;
//     var particlesPositions = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount; i++) {
//       // Generate random spherical coordinates
//       const theta = Math.random() * Math.PI * 2; // Azimuthal angle
//       const phi = Math.acos(Math.random() * 2 - 1); // Polar angle

//       // Convert spherical coordinates to Cartesian coordinates within the sphere
//       const radius = 1.5; // Radius of the sphere
//       particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//       particlesPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       particlesPositions[i * 3 + 2] = radius * Math.cos(phi);
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Particle Motion
//       particleSystem.rotation.x += 0.01;
//       particleSystem.rotation.y += 0.01;

//       // Cube Rotation
//       // cube.rotation.x += 0.01;
//       // cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;

// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 25;
//     var particlesPositions = new Float32Array(particlesCount * 3);
//     var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());

//     for (let i = 0; i < particlesCount; i++) {
//       // Generate random spherical coordinates
//       const theta = Math.random() * Math.PI * 2; // Azimuthal angle
//       const phi = Math.acos(Math.random() * 2 - 1); // Polar angle

//       // Convert spherical coordinates to Cartesian coordinates within the sphere
//       const radius = 1.5; // Radius of the sphere
//       particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//       particlesPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       particlesPositions[i * 3 + 2] = radius * Math.cos(phi);
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Camera Position
//     camera.position.z = 5;

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Update Particle Motion (Firefly-like motion)
//       for (let i = 0; i < particlesCount; i++) {
//         // Apply random changes to particle velocity
//         particlesVelocities[i].x += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].y += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].z += (Math.random() - 0.5) * 0.01;

//         // Update particle position based on velocity
//         particlesPositions[i * 3] += particlesVelocities[i].x;
//         particlesPositions[i * 3 + 1] += particlesVelocities[i].y;
//         particlesPositions[i * 3 + 2] += particlesVelocities[i].z;
//       }

//       particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

//       // Cube Rotation
//       // cube.rotation.x += 0.01;
//       // cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;
// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 25;
//     var particlesPositions = new Float32Array(particlesCount * 3);
//     var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());

//     for (let i = 0; i < particlesCount; i++) {
//       // Generate random spherical coordinates
//       const theta = Math.random() * Math.PI * 2; // Azimuthal angle
//       const phi = Math.acos(Math.random() * 2 - 1); // Polar angle

//       // Convert spherical coordinates to Cartesian coordinates within the sphere
//       const radius = 1.5; // Radius of the sphere
//       particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//       particlesPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       particlesPositions[i * 3 + 2] = radius * Math.cos(phi);
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Update Particle Motion (Firefly-like motion)
//       for (let i = 0; i < particlesCount; i++) {
//         // Apply random changes to particle velocity
//         particlesVelocities[i].x += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].y += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].z += (Math.random() - 0.5) * 0.01;

//         // Update particle position based on velocity
//         particlesPositions[i * 3] += particlesVelocities[i].x;
//         particlesPositions[i * 3 + 1] += particlesVelocities[i].y;
//         particlesPositions[i * 3 + 2] += particlesVelocities[i].z;

//         // Ensure particles stay within the diameter-3 sphere
//         const particleRadius = Math.sqrt(
//           particlesPositions[i * 3] ** 2 +
//           particlesPositions[i * 3 + 1] ** 2 +
//           particlesPositions[i * 3 + 2] ** 2
//         );
//         if (particleRadius > 1.5) {
//           particlesPositions[i * 3] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 1] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 2] /= particleRadius / 1.5;
//         }
//       }

//       particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

//export default MyThree;
// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 25;
//     var particlesPositions = new Float32Array(particlesCount * 3);
//     var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());

//     // Function to reset particle positions
//     const resetParticles = () => {
//       for (let i = 0; i < particlesCount; i++) {
//         const theta = Math.random() * Math.PI * 2;
//         const phi = Math.acos(Math.random() * 2 - 1);
//         const radius = 1.5;
//         particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
//         particlesPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//         particlesPositions[i * 3 + 2] = radius * Math.cos(phi);
//       }
//     };

//     // Initial particle position setup
//     resetParticles();
//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Variables for timing
//     var lastResetTime = Date.now();

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Update Particle Motion (Firefly-like motion)
//       for (let i = 0; i < particlesCount; i++) {
//         particlesVelocities[i].x += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].y += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].z += (Math.random() - 0.5) * 0.01;

//         particlesPositions[i * 3] += particlesVelocities[i].x;
//         particlesPositions[i * 3 + 1] += particlesVelocities[i].y;
//         particlesPositions[i * 3 + 2] += particlesVelocities[i].z;

//         const particleRadius = Math.sqrt(
//           particlesPositions[i * 3] ** 2 +
//           particlesPositions[i * 3 + 1] ** 2 +
//           particlesPositions[i * 3 + 2] ** 2
//         );

//         if (particleRadius > 1.5) {
//           particlesPositions[i * 3] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 1] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 2] /= particleRadius / 1.5;
//         }
//       }

//       particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

//       // Check if it's time to reset particles
//       const currentTime = Date.now();
//       const elapsedTime = (currentTime - lastResetTime) / 1000; // Convert to seconds

//       if (elapsedTime > Math.random() * (7 - 4) + 4) {
//         resetParticles();
//         particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//         lastResetTime = currentTime;
//       }

//       renderer.render(scene, camera);
//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;
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
    var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

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

    // Geometry, Material, Mesh (Cube)
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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
// 
// import * as THREE from 'three';
// import { useEffect, useRef } from 'react';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';

// function MyThree() {
//   const refContainer = useRef(null);

//   const initializeScene = (container) => {
//     // Scene, Camera, Renderer
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // Particle System
//     var particles = new THREE.BufferGeometry();
//     var particleMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

//     var particlesCount = 25;
//     var particlesPositions = new Float32Array(particlesCount * 3);
//     var particlesVelocities = new Array(particlesCount).fill().map(() => new THREE.Vector3());
//     var lastResetTimes = new Array(particlesCount).fill(0);

//     // Function to reset particle positions
//     const resetParticle = (index) => {
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(Math.random() * 2 - 1);
//       const radius = 1.5;
//       particlesPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
//       particlesPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       particlesPositions[index * 3 + 2] = radius * Math.cos(phi);
//       lastResetTimes[index] = Date.now();
//     };

//     // Initial particle position setup
//     for (let i = 0; i < particlesCount; i++) {
//       resetParticle(i);
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
//     var particleSystem = new THREE.Points(particles, particleMaterial);
//     scene.add(particleSystem);

//     // Geometry, Material, Mesh (Cube)
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Camera Position
//     camera.position.z = 5;

//     // Bloom effect
//     const composer = new EffectComposer(renderer);
//     composer.addPass(new RenderPass(scene, camera));

//     const bloomPass = new BloomPass(1, 25, 5, 256);
//     composer.addPass(bloomPass);

//     // Animation Loop
//     var animate = function () {
//       requestAnimationFrame(animate);

//       // Update Particle Motion (Firefly-like motion)
//       for (let i = 0; i < particlesCount; i++) {
//         particlesVelocities[i].x += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].y += (Math.random() - 0.5) * 0.01;
//         particlesVelocities[i].z += (Math.random() - 0.5) * 0.01;

//         particlesPositions[i * 3] += particlesVelocities[i].x;
//         particlesPositions[i * 3 + 1] += particlesVelocities[i].y;
//         particlesPositions[i * 3 + 2] += particlesVelocities[i].z;

//         const particleRadius = Math.sqrt(
//           particlesPositions[i * 3] ** 2 +
//           particlesPositions[i * 3 + 1] ** 2 +
//           particlesPositions[i * 3 + 2] ** 2
//         );

//         if (particleRadius > 1.5) {
//           particlesPositions[i * 3] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 1] /= particleRadius / 1.5;
//           particlesPositions[i * 3 + 2] /= particleRadius / 1.5;
//         }

//         // Check if it's time to reset this particle
//         const currentTime = Date.now();
//         const elapsedTime = (currentTime - lastResetTimes[i]) / 1000; // Convert to seconds

//         if (elapsedTime > Math.random() * (7 - 4) + 4) {
//           resetParticle(i);
//         }
//       }

//       particles.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

//       // Render scene with bloom effect
//       composer.render();

//     };
//     animate();
//   };

//   useEffect(() => {
//     if (refContainer.current) {
//       initializeScene(refContainer.current);
//     }
//   }, []);

//   return <div ref={refContainer}></div>;
// }

// export default MyThree;