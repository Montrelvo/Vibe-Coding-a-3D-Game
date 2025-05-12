import * as THREE from 'three';
import { createScene, createCamera, createRenderer, createRoom } from './js/scene.js';
import { setupMouseControls, setupKeyboardControls, updateCameraMovement } from './js/controls.js';

// Set up the scene, camera, and renderer
const scene = createScene();
const camera = createCamera(window.innerWidth / window.innerHeight);
const canvas = document.getElementById('gameCanvas');
const renderer = createRenderer(canvas);

// Add the room to the scene
const room = createRoom();
scene.add(room);

// Setup controls
const keysPressed = {};
setupMouseControls(canvas, camera);
setupKeyboardControls(camera, keysPressed);

// Clock for tracking time delta
const clock = new THREE.Clock();

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    // Update camera movement based on keyboard input
    updateCameraMovement(camera, keysPressed, deltaTime);

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();