// Variables
// _________________________

var camera, camera1, camera2, camera3;
var scene, renderer;

var rocket;

var arrayOfObjects = [];

var clock = new THREE.Clock();
var radius = 1200;
var theta = Math.floor(Math.random() * (2*Math.PI + 1));
var phi = Math.floor(Math.random() * (2*Math.PI + 1));

var flagPress1, flagPress2;
var flagUp, flagDown, flagLeft, flagRight;

// Materials
// _________________________

var materials = {
    brightWhite: new THREE.MeshBasicMaterial({ color: 0xf4f5f0 }),
    marsRed: new THREE.MeshBasicMaterial({ color: 0xbc2732 }),
    moonRock: new THREE.MeshBasicMaterial({ color: 0x958d84 })
}

// Geometries
// _________________________

var geometries = {
    capsule: new THREE.CapsuleGeometry(1, 1, 16, 16),
    cone: new THREE.ConeGeometry(1, 1, 16),
    cube: new THREE.BoxGeometry(1, 1, 1, 8, 8, 8),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 16),
    dodecahedron: new THREE.DodecahedronGeometry(1, 0),
    sphere: new THREE.SphereGeometry(1, 32, 32)
}

// Objects
// _________________________

function createCone(c) {
    'use strict';

    var cone = new THREE.Mesh(geometries.cone, c);

    do {
        var x = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
        var y = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
    } while (Math.pow(x,2) + Math.pow(y,2) > Math.pow(1440,2));
    var s = Math.floor(Math.random() * (1 + 1));
    if (s == 0) {
        var z = Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    else {
        var z = -Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    cone.position.set(x, y, z);

    var r = 55/3;
    var h = 110/3;
    cone.scale.x = r;
    cone.scale.y = h;
    cone.scale.z = r;

    cone.rotateZ(Math.floor(Math.random() * (2*Math.PI + 1)));

    scene.add(cone);
    arrayOfObjects.push(cone);
}

function createCube(c) {
    'use strict';

    var cube = new THREE.Mesh(geometries.cube, c);

    do {
        var x = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
        var y = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
    } while (Math.pow(x,2) + Math.pow(y,2) > Math.pow(1440,2));
    var s = Math.floor(Math.random() * (1 + 1));
    if (s == 0) {
        var z = Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    else {
        var z = -Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    cube.position.set(x, y, z);

    var a = 35.36;
    cube.scale.x = a;
    cube.scale.y = a;
    cube.scale.z = a;

    cube.rotateZ(Math.floor(Math.random() * (2*Math.PI + 1)));

    scene.add(cube);
    arrayOfObjects.push(cube);
}

function createDodecahedron(c) {
    'use strict';

    var dodecahedron = new THREE.Mesh(geometries.dodecahedron, c);

    do {
        var x = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
        var y = Math.floor(Math.random() * (1440 - (-1440) + 1)) + (-1440);
    } while (Math.pow(x,2) + Math.pow(y,2) > Math.pow(1440,2));
    var s = Math.floor(Math.random() * (1 + 1));
    if (s == 0) {
        var z = Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    else {
        var z = -Math.floor(Math.pow(Math.pow(1440,2) - Math.pow(x,2) - Math.pow(y,2), 1/2));
    }
    dodecahedron.position.set(x, y, z);

    var r = 30;
    dodecahedron.scale.x = r;
    dodecahedron.scale.y = r;
    dodecahedron.scale.z = r;

    dodecahedron.rotateZ(Math.floor(Math.random() * (2*Math.PI + 1)));

    scene.add(dodecahedron);
    arrayOfObjects.push(dodecahedron);
}

function createPlanet(x, y, z, r, c) {
    'use strict';
    var sphere = new THREE.Mesh(geometries.sphere, c);
    
    sphere.position.set(x, y, z);

    sphere.scale.x = r;
    sphere.scale.y = r;
    sphere.scale.z = r;

    scene.add(sphere);
}

function createRocket(c) {
    'use strict';
    
    rocket = new THREE.Group();

    var mainBody = new THREE.Mesh(geometries.cylinder, c);

    mainBody.position.set(0, -10, 0);
    mainBody.scale.x = 12;
    mainBody.scale.y = 60;
    mainBody.scale.z = 12;

    var nose = new THREE.Mesh(geometries.cylinder, c);

    nose.position.set(0, 40, 0);
    nose.scale.x = 8; 
    nose.scale.y = 40;
    nose.scale.z = 8;
    
    var auxiliaryPropellant1 = new THREE.Mesh(geometries.capsule, c);
    
    auxiliaryPropellant1.position.set(0, -40, 20);
    auxiliaryPropellant1.scale.x = 8;
    auxiliaryPropellant1.scale.y = 40/3;
    auxiliaryPropellant1.scale.z = 8;
    
    var auxiliaryPropellant2 = new THREE.Mesh(geometries.capsule, c);

    auxiliaryPropellant2.position.set(20, -40, 0);
    auxiliaryPropellant2.scale.x = 8;
    auxiliaryPropellant2.scale.y = 40/3;
    auxiliaryPropellant2.scale.z = 8;

    var auxiliaryPropellant3 = new THREE.Mesh(geometries.capsule, c);

    auxiliaryPropellant3.position.set(0, -40, -20);
    auxiliaryPropellant3.scale.x = 8;
    auxiliaryPropellant3.scale.y = 40/3;
    auxiliaryPropellant3.scale.z = 8;
    
    var auxiliaryPropellant4 = new THREE.Mesh(geometries.capsule, c);

    auxiliaryPropellant4.position.set(-20, -40, 0);
    auxiliaryPropellant4.scale.x = 8;
    auxiliaryPropellant4.scale.y = 40/3;
    auxiliaryPropellant4.scale.z = 8;

    rocket.add(mainBody, nose, auxiliaryPropellant1, auxiliaryPropellant2, auxiliaryPropellant3, auxiliaryPropellant4);

    moveRocket();
    
    scene.add(rocket);
}

function createSpaceDebris(c) {
    'use strict';
    
    for (let i = 0; i < 7; i++) {
        createCone(c);
    }

    for (let i = 0; i < 7; i++) {
        createCube(c);
    }

    for (let i = 0; i < 7; i++) {
        createDodecahedron(c);
    }    
}

// Scene
// _________________________

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createPlanet(0, 0, 0, radius, materials.marsRed);
    createRocket(materials.brightWhite);
    createSpaceDebris(materials.moonRock);
}

// Cameras
// _________________________

function createCamera() {
    'use strict';

    camera1 = new THREE.OrthographicCamera(-window.innerWidth*2.2, window.innerWidth*2.2, window.innerHeight*2.2, -window.innerHeight*2.2, 0, 3456);
    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 1728;

    camera2 = new THREE.PerspectiveCamera(90,
                                         window.innerWidth / window.innerHeight,
                                         0.1,
                                         6912);
    camera2.position.x = 1728;
    camera2.position.y = 1728;
    camera2.position.z = 1728;

    camera3 = new THREE.PerspectiveCamera(90,
                                        window.innerWidth / window.innerHeight,
                                        0.1,
                                        6912);
    camera3.position.x = 0;
    camera3.position.y = -60;
    camera3.position.z = -40;
    rocket.add(camera3);

    scene.add(camera);
    
    camera = camera1;
    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(rocket.position);
    camera.lookAt(scene.position);
}

// Functionalities and Callbacks
// _____________________________

function toggleWireframe() {
    Object.values(materials).forEach((material) => material.wireframe = !material.wireframe);
}

function detectCollisions(object1, object2, i){
    var xa = object1.position.x, xb = object2.position.x;
    var ya = object1.position.y, yb = object2.position.y;
    var za = object1.position.z, zb = object2.position.z;
    var rb = 60;

    if(i == 0){ // Cone - 27.5
        var ra = 27.5;
    }
    else if(i == 1){ // Cube - 35.36
        var ra = 35.36;
    }
    else if(i == 2){ // Dodecahedron 30
        var ra = 30;
    }

    var dist = Math.pow((Math.pow(xa - xb, 2)) + (Math.pow(ya - yb, 2)) + (Math.pow(za - zb,2)), 0.5);

    if((ra + rb) >= (dist)) {
        return true;
    } 
    else {
        return false;
    }
}


function detectAllCollisions(){
    'use strict';

    for(var i = 0; i < arrayOfObjects.length; i++){
        if(detectCollisions(arrayOfObjects[i], rocket, Math.floor(i / 7))){
            scene.remove(arrayOfObjects[i]);
            arrayOfObjects.splice(i, 1);
            break;
        }
    }
}

function moveRocket() {
    'use strict';

    rocket.position.x = 1.2 * radius * Math.sin(theta) * Math.sin(phi);
    rocket.position.y = 1.2 * radius * Math.cos(phi);
    rocket.position.z = 1.2 * radius * Math.cos(theta) * Math.sin(phi);
}

function update(delta_t) {
    'use strict';

    let angles = new THREE.Vector3(0, 0, 0);
    let phi_step = 1;
    let theta_step = 1;

    //delta phi
    angles.y += (flagPress1 && flagUp) ? -phi_step : 0 +
                (flagPress1 && flagDown) ? phi_step : 0;

    //delta theta
    angles.x += (flagPress2 && flagLeft) ? -theta_step : 0 +
                (flagPress2 && flagRight) ? theta_step : 0;

    angles.normalize();

    phi += angles.y * delta_t;
    theta += angles.x * delta_t;
    
    rocket.lookAt(scene.position);
    rocket.up.subVectors(angles, rocket.position);
    moveRocket();
}


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        // Orthographic camera
        if(camera instanceof THREE.OrthographicCamera) {
            camera.left = -window.innerWidth*2.2;
            camera.right = window.innerWidth*2.2;
            camera.top = window.innerHeight*2.2;
            camera.bottom = -window.innerHeight*2.2;
            camera.updateProjectionMatrix();
        }
        // Perspective camera
        else {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        // Camera keys
        case 49: //1
            camera = camera1;
            break;
        case 50: //2
            camera = camera2;
            break;
        case 51: //3
            camera = camera3;
            break;

        // Wireframe key
        case 87: //w
            toggleWireframe();
            break;
       
        // Movement keys
        case 38: //ArrowUp
            flagPress1 = true;
            flagUp = true;
            break;
        case 40: //ArrowDown
            flagPress1 = true;
            flagDown = true;
            break;
        case 37: //ArrowLeft
            flagPress2 = true;
            flagLeft = true;
            break;
        case 39: //ArrowRight
            flagPress2 = true;
            flagRight = true;
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

        // Movement keys
        case 38: //ArrowUp
            if(!flagDown){
                flagPress1 = false;
            }
            flagUp = false;
            break;
        case 40: //ArrowDown
            if(!flagUp){
                flagPress1 = false;
            }
            flagDown = false;
            break;
        case 37: //ArrowLeft
            if(!flagRight){
                flagPress2 = false;
            }
            flagLeft = false;
            break;
        case 39: //ArrowRight
            if(!flagLeft){
                flagPress2 = false;
            }
            flagRight = false;
            break;
    }
}

// Animate
// _________________________

function animate() {
    'use strict';

    let delta_t = clock.getDelta();

    breakme: if((flagUp && flagDown && flagRight && flagLeft) ||
                (flagUp && flagDown && !flagPress2) ||
                (flagLeft && flagRight && !flagPress1)) {
        break breakme;
    }
    else {
        update(delta_t);
    }
    
    detectAllCollisions();
    render();

    requestAnimationFrame(animate);
}

// Render
// _________________________

function render() {
    'use strict';

    renderer.render(scene, camera);
}

// Init
// _________________________

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}