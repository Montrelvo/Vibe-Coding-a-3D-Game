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

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // No object rotation in this basic room setup

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();