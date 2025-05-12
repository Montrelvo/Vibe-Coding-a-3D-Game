import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();
    return scene;
}

export function createCamera(aspectRatio) {
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 1.6, 0); // Position camera at a typical human height
    camera.lookAt(0, 2.5, -5); // Look towards the front wall
    return camera;
}

export function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

export function createRoom() {
    const room = new THREE.Group();

    // Floor
    const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10); // Width, Height, Depth
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Grey color
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    room.add(floor);

    // Walls (adjust dimensions and positions as needed)
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }); // Light grey color

    const wall1Geometry = new THREE.BoxGeometry(10, 5, 0.1);
    const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
    wall1.position.z = -5;
    wall1.position.y = 2.5; // Half of wall height
    room.add(wall1);

    const wall2Geometry = new THREE.BoxGeometry(10, 5, 0.1);
    const wall2 = new THREE.Mesh(wall2Geometry, wallMaterial);
    wall2.position.z = 5;
    wall2.position.y = 2.5;
    room.add(wall2);

    const wall3Geometry = new THREE.BoxGeometry(0.1, 5, 10);
    const wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
    wall3.position.x = -5;
    wall3.position.y = 2.5;
    room.add(wall3);

    const wall4Geometry = new THREE.BoxGeometry(0.1, 5, 10);
    const wall4 = new THREE.Mesh(wall4Geometry, wallMaterial);
    wall4.position.x = 5;
    wall4.position.y = 2.5;
    room.add(wall4);

    return room;
}