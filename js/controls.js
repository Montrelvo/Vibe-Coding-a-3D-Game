import * as THREE from 'three';

export function setupMouseControls(canvas, camera) {
    let isRightMouseButtonPressed = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

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
}

export function setupKeyboardControls(camera, keysPressed) {
    window.addEventListener('keydown', (event) => {
        keysPressed[event.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });
}

export function updateCameraMovement(camera, keysPressed, deltaTime) {
    const moveSpeed = 5 * deltaTime; // Adjust speed based on deltaTime
    const rotationSpeed = 2 * deltaTime; // Adjust speed based on deltaTime

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
}