// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // Not needed if using existing canvas

// Create a basic cube
// Create room components
const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10); // Width, Height, Depth
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Grey color
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

// Walls (adjust dimensions and positions as needed)
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }); // Light grey color

const wall1Geometry = new THREE.BoxGeometry(10, 5, 0.1);
const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
wall1.position.z = -5;
wall1.position.y = 2.5; // Half of wall height
scene.add(wall1);

const wall2Geometry = new THREE.BoxGeometry(10, 5, 0.1);
const wall2 = new THREE.Mesh(wall2Geometry, wallMaterial);
wall2.position.z = 5;
wall2.position.y = 2.5;
scene.add(wall2);

const wall3Geometry = new THREE.BoxGeometry(0.1, 5, 10);
const wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
wall3.position.x = -5;
wall3.position.y = 2.5;
scene.add(wall3);

const wall4Geometry = new THREE.BoxGeometry(0.1, 5, 10);
const wall4 = new THREE.Mesh(wall4Geometry, wallMaterial);
wall4.position.x = 5;
wall4.position.y = 2.5;
scene.add(wall4);


// Set camera position inside the room
camera.position.set(0, 1.6, 0); // Position camera at a typical human height
camera.lookAt(0, 2.5, -5); // Look towards the front wall

// Mouse control variables
let isRightMouseButtonPressed = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Keyboard control variables
const keysPressed = {};

// Add event listeners for mouse control on the canvas
const canvas = renderer.domElement;

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 2) { // Right mouse button
        isRightMouseButtonPressed = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
        canvas.style.cursor = 'grabbing'; // Change cursor style
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (event.button === 2) { // Right mouse button
        isRightMouseButtonPressed = false;
        canvas.style.cursor = 'grab'; // Restore cursor style
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isRightMouseButtonPressed) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Adjust sensitivity as needed
        const sensitivity = 0.002;

        // Rotate camera based on mouse movement
        // Rotating around the Y axis for horizontal movement
        camera.rotation.y -= deltaX * sensitivity;

        // Rotating around the X axis for vertical movement
        // Need to be careful about flipping the camera
        camera.rotation.x -= deltaY * sensitivity;

        // Optional: Limit vertical rotation to prevent flipping
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));


        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }
});

// Prevent context menu on right click
canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Add event listeners for keyboard control
window.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
});


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Handle keyboard movement
    const moveSpeed = 0.05;
    const rotationSpeed = 0.02;

    if (keysPressed['w']) {
        // Move forward
        camera.translateZ(-moveSpeed);
    }
    if (keysPressed['s']) {
        // Move backward
        camera.translateZ(moveSpeed);
    }
    if (keysPressed['a']) {
        // Rotate left (around the camera's local Y axis)
        camera.rotateY(rotationSpeed);
    }
    if (keysPressed['d']) {
        // Rotate right (around the camera's local Y axis)
        camera.rotateY(-rotationSpeed);
    }


    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();