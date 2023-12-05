import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Grass from "./geometry/Grass";

function MyThree() {
  const refContainer = useRef(null);

  const initializeScene = (container) => {
    // Scene, Camera, Renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Geometry, Material, Mesh (Cube)
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Camera Position
    camera.position.z = 5;

    // Grass?
    const grass = new Grass(30, 100000);
    scene.add(grass);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.maxDistance = 15;

    // Renderer loop
    renderer.setAnimationLoop((time) => {
      grass.update(time);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      controls.update();
      renderer.render(scene, camera);
    });

    // // Animation Loop
    // var animate = function () {
    //   requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // };
    // animate();
  };

  useEffect(() => {
    if (refContainer.current) {
      initializeScene(refContainer.current);
    }
  }, []);

  return <div ref={refContainer}></div>;
}

export default MyThree;
