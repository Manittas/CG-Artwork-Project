// Classes and Variables
// _____________________

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}
}

var camera, camera1, camera2, camera3, camera4;
var scene, renderer;
var axis;

var maxLengthX = 1660+(Math.sqrt(20000)*3/2);
var maxLengthY = 1167;
var maxLengthZ = 800;

var sphereRotate, parallelepipedRotate, coneRotate;
var torus;
var path = new CustomSinCurve( 10 );

var flagPress1, flagPress2, flagPress3, flagPress4, flagPress5, flagPress6;
var flagQ, flagW, flagA, flagS, flagZ, flagX, flagFastRotation;
var flagUp, flagDown, flagLeft, flagRight, flagD, flagC;

var materials = {
    dirtyBlack: new THREE.MeshBasicMaterial({ color: 0x0e0c09 }),
    darkOrange: new THREE.MeshBasicMaterial({ color: 0xd07f58 }),
    lightOrange: new THREE.MeshBasicMaterial({ color: 0xd5974d }),
    yellow: new THREE.MeshBasicMaterial({ color: 0xddc66a }),
    dirtyWhite: new THREE.MeshBasicMaterial({ color: 0xf5f5ed }),
    purple: new THREE.MeshBasicMaterial({ color: 0x41487f }),
    blue: new THREE.MeshBasicMaterial({ color: 0x53a3a0 }),
    green: new THREE.MeshBasicMaterial({ color: 0x699325 }),    
    darkRed: new THREE.MeshBasicMaterial({ color: 0xb64830 }),
    lightRed: new THREE.MeshBasicMaterial({ color: 0xea9e7d })
}

var geometries = {
    // objects that will move
    sphere: new THREE.SphereGeometry(85, 36, 16),
    parallelepiped: new THREE.BoxGeometry(17, 529, 17, 4, 4, 4),
    upsideDownCone: new THREE.ConeGeometry(85, 390, 30),
    // all other objects
    cone: new THREE.ConeGeometry(1, 1, 64),
    cube: new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 64),
    dodecahedron: new THREE.DodecahedronGeometry(1, 0),
    torus: new THREE.TorusGeometry(1, 0.4, 64, 64),
    tube: new THREE.TubeGeometry(path, 64, 1, 8, false)
}

// Objects grouped to move
// _______________________

function createSphere(x, y, z, c) {
    'use strict';

    sphereRotate = new THREE.Mesh(geometries.sphere, c);

    sphereRotate.position.set(x, y, z);

    scene.add(sphereRotate);
}

function createParallelepiped(x, y, z, c) {
    'use strict';

    parallelepipedRotate = new THREE.Mesh(geometries.parallelepiped, c);

    parallelepipedRotate.position.set(x, y, z);
    parallelepipedRotate.rotateZ(-Math.PI/4);

    sphereRotate.add(parallelepipedRotate);
}

function createUpsideDownCone(x, y, z, c) {
    'use strict';

    coneRotate = new THREE.Mesh(geometries.upsideDownCone, c);

    coneRotate.position.set(x, y, z);
    coneRotate.rotateZ(-3*(Math.PI/4));

    parallelepipedRotate.add(coneRotate);
}

// Objects to add to the scene
// ___________________________

function createCone(x, y, z, s1, s2, c) {
    'use strict';

    var cone = new THREE.Mesh(geometries.cone, c);

    cone.position.set(x, y, z);
    cone.scale.x = s1;
    cone.scale.y = s2;
    cone.scale.z = s1;

    scene.add(cone);
}

function createCylinder(x, y, z, s1, s2, c) {
    'use strict';

    var cylinder = new THREE.Mesh(geometries.cylinder, c);

    cylinder.position.set(x, y, z);
    cylinder.scale.x = s1;
    cylinder.scale.y = s2;
    cylinder.scale.z = s1;
    cylinder.rotateX(Math.PI/2);

    scene.add(cylinder);
}

function createCube(x, y, z, s, c) {
    'use strict';

    var cube = new THREE.Mesh(geometries.cube, c);

    cube.position.set(x, y, z);
    cube.scale.x = s;
    cube.scale.y = s;
    cube.scale.z = s;

    scene.add(cube);
}

function createTiltedCube(x, y, z, s, c) {
    'use strict';

    var cube = new THREE.Mesh(geometries.cube, c);

    cube.position.set(x, y, z);
    cube.scale.x = s;
    cube.scale.y = s;
    cube.scale.z = s;
    cube.rotateZ(Math.PI / 4);

    scene.add(cube);
}

function createDodecahedron(x, y, z, s, c) {
    'use strict';

    var dodecahedron = new THREE.Mesh(geometries.dodecahedron, c);

    dodecahedron.position.set(x, y, z);
    dodecahedron.scale.x = s;
    dodecahedron.scale.y = s;
    dodecahedron.scale.z = s;

    scene.add(dodecahedron);
}

function createTorus(x, y, z, s1, s2, c) {
    'use strict';

    torus = new THREE.Mesh(geometries.torus, c);

    torus.position.set(x, y, z);
    torus.scale.x = s1;
    torus.scale.y = s1;
    torus.scale.z = s2;

    scene.add(torus);
}

function createTube(x, y, z, s, c) {
    'use strict';

    var tube = new THREE.Mesh(geometries.tube, c);

    tube.position.set(x, y, z);
    tube.scale.x = s;
    tube.scale.y = s;
    tube.scale.z = s;
    tube.rotateZ(Math.PI/3);
    tube.rotateY(Math.PI);

    scene.add(tube);
}

// Scene and Cameras creation
// __________________________

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xece5b8);

    axis = new THREE.AxisHelper(maxLengthX)
    scene.add(axis);

    // objects that will move
    createSphere(1000, 700, 485, materials.blue);
    createParallelepiped(-107, -239, 0, materials.green);
    createUpsideDownCone(0, 0, 0, materials.purple);

    // all other objects
    createTorus(200, 700, 200, 143, 500, materials.dirtyBlack);
    createTube(150, 250, 400, 3.5, materials.dirtyBlack);
    createCylinder(450, 250, 50, 50, 100, materials.darkOrange);
    createCylinder(550, 300, 150, 50, 100, materials.lightOrange);
    createCylinder(650, 350, 250, 50, 100, materials.yellow);
    createDodecahedron(675, 700, 325, 25, materials.dirtyWhite);
    createCone(1185, 584, 125, 125, 633, materials.dirtyWhite);
    createCube(1460, 735, 400, 100, materials.green);
    createTiltedCube(1660 , 675, 750, 100, materials.darkRed);
    createTiltedCube(1660+(Math.sqrt(20000)/2), 675+(Math.sqrt(20000)/2), 650, 100, materials.lightRed);
    createTiltedCube(1660+(Math.sqrt(20000)), 675, 550, 100, materials.dirtyBlack);
    createTiltedCube(1660+(Math.sqrt(20000)/2), 675-(Math.sqrt(20000)/2), 450, 100, materials.lightRed);
}

function createCamera() {
    'use strict';

    // all cameras adjusted to 16x9, press f11 key for full resolution
    camera1 = new THREE.OrthographicCamera(-50,
                                        maxLengthX+50, 
                                        maxLengthY+50,
                                        -50, 
                                        0,
                                        maxLengthX);

    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = maxLengthX;

    camera2 = new THREE.OrthographicCamera(-50,
                                        maxLengthX+50, 
                                        maxLengthY+50,
                                        -50, 
                                        0,
                                        maxLengthX);

    camera2.position.x = -1;
    camera2.position.y = 0;
    camera2.position.z = 0;

    camera3 = new THREE.OrthographicCamera(-50,
                                        maxLengthX+50, 
                                        maxLengthY+50,
                                        -50, 
                                        0,
                                        maxLengthX);

    camera3.position.x = 0;
    camera3.position.y = -1;
    camera3.position.z = 0;

    camera4 = new THREE.PerspectiveCamera(90,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         maxLengthX*2);
    camera4.position.x = maxLengthX;
    camera4.position.y = maxLengthX;
    camera4.position.z = maxLengthX;

    camera = camera1;
    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(scene.position);
    camera4.lookAt(scene.position);
    camera.lookAt(scene.position);
    
    scene.add(camera);
}

// Toggles and callbacks
// _____________________

function toggleWireframe() {
    Object.values(materials).forEach((material) => material.wireframe = !material.wireframe);
}

function toggleAxis() {
    axis.visible = !axis.visible;
}

function stopRotationToru() {
    flagFastRotation = false;
    scene.remove(torus);
    createTorus(200, 700, 200, 143, 500, materials.dirtyBlack);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        // Camera keys
        case 49: //1 - camera 1
            camera = camera1;
            camera.lookAt(scene.position);
            break;
        case 50: //2 - camera 2
            camera = camera2;
            camera.lookAt(scene.position);
            break;
        case 51: //3 - camera 3
            camera = camera3;
            camera.lookAt(scene.position);
            break;
        case 48: //0 - perspective camera for 3d look at the objects
            camera = camera4;
            camera.lookAt(scene.position);
            break;

        // Wires and axis keys
        case 52: //4 - switches between wired or solid color
            toggleWireframe();
            break;
        case 69: //e - takes out the axis
            toggleAxis();
            break;

        // Rotation keys
        case 81: //q - rotates clockwise on its Y axis
            flagPress1 = true;
            flagQ = true;
            break;
        case 87: //w - rotates counter clockwise on its Y axis
            flagPress1 = true;
            flagW = true;
            break;
        case 65: //a - rotates clockwise on its X axis
            flagPress2 = true;
            flagA = true;
            break;
        case 83: //s - rotates counter clockwise on its X axis
            flagPress2 = true;
            flagS = true;
            break;
        case 90: //z - rotates counter clockwise on its Z axis
            flagPress3 = true;
            flagZ = true;
            break;
        case 88: //x - rotates clockwise on its Z axis
            flagPress3 = true;
            flagX = true;
            break;

        // Position movement keys
        case 38: //up arrow to move y
            flagPress4 = true;
            flagUp = true;
            break;
        case 40: //down arrow to move y
            flagPress4 = true;
            flagDown = true;
            break;
        case 37: //left arrow to move x
            flagPress5 = true;
            flagLeft = true;
            break;
        case 39: //right arrow to move x
            flagPress5 = true;
            flagRight = true;
            break;
        case 68: //d to move z
            flagPress6 = true;
            flagD = true;
            break;
        case 67: //c to move z
            flagPress6 = true;
            flagC = true;
            break;
        case 79: //o to set to original position
            parallelepipedRotate.remove(coneRotate);
            sphereRotate.remove(parallelepipedRotate);
            scene.remove(sphereRotate);
            createSphere(1000, 700, 485, materials.blue);
            createParallelepiped(-107, -239, 0, materials.green);
            createUpsideDownCone(0, 0, 0, materials.purple);
            break;
            
        // Surprise and fun funcionality
        case 82: //r - rotates toru at a fast speed in a random time no more than 3 seconds and repositions its angles after it
            flagFastRotation = true;
            setTimeout(stopRotationToru, Math.floor(Math.random() * 3000) + 1);
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

        // Rotation keys
        case 81: //q - stop clockwise rotation on its Y axis
            if(!flagW){
                flagPress1 = false;
            }
            flagQ = false;
            break;
        case 87: //w - stop counter clockwise rotation on its Y axis
            if(!flagQ){
                flagPress1 = false;
            }
            flagW = false;
            break;
        case 65: //a - stop clockwise rotation on its X axis
            if(!flagS){
                flagPress2 = false;
            }
            flagA = false;
            break;
        case 83: //s - stop counter clockwise rotation on its X axis
            if(!flagA){
                flagPress2 = false;
            }
            flagS = false;
            break;
        case 90: //z - stop counter clockwise rotation on its Z axis
            if(!flagX){
                flagPress3 = false;
            }
            flagZ = false;
            break;
        case 88: //x - stop clockwise rotation on its Z axis
            if(!flagZ){
                flagPress3 = false;
            }
            flagX = false;
            break;

        // Position movement keys
        case 38: //up arrow to stop
            if(!flagDown){
                flagPress4 = false;
            }
            flagUp = false;
            break;
        case 40: //down arrow to stop
            if(!flagUp){
                flagPress4 = false;
            }
            flagDown = false;
            break;
        case 37: //left arrow to stop
            if(!flagRight){
                flagPress5 = false;
            }
            flagLeft = false;
            break;
        case 39: //right arrow to stop
            if(!flagLeft){
                flagPress5 = false;
            }
            flagRight = false;
            break;
        case 68: //d to stop
            if(!flagC){
                flagPress6 = false;
            }
            flagD = false;
            break;
        case 67: //c to stop
            if(!flagD){
                flagPress6 = false;
            }
            flagC = false;
            break;
    }
}

// Animate
// _______

function animate() {
    'use strict';

    // Rotation animations
    if(flagPress1 && flagQ){
        sphereRotate.rotateY(0.01);
    }

    if(flagPress1 && flagW){
        sphereRotate.rotateY(-0.01);
    }

    if(flagPress2 && flagA){
        parallelepipedRotate.rotateX(0.01);
        parallelepipedRotate.translateZ(-2.5);
    }

    if(flagPress2 && flagS){
        parallelepipedRotate.rotateX(-0.01);
        parallelepipedRotate.translateZ(2.5);
    }

    if(flagPress3 && flagZ){
        coneRotate.rotateX(0.01);
    }

    if(flagPress3 && flagX){
        coneRotate.rotateX(-0.01);
    }

    if(flagFastRotation){
        torus.rotateY(1);
    }

    // Position movement animations
    if(flagPress4 && flagUp){
        sphereRotate.position.y++;
    }

    if(flagPress4 && flagDown){
        sphereRotate.position.y--;
    }

    if(flagPress5 && flagLeft){
        sphereRotate.position.x--;
    }

    if(flagPress5 && flagRight){
        sphereRotate.position.x++;
    }

    if(flagPress6 && flagD){
        sphereRotate.position.z++;
    }

    if(flagPress6 && flagC){
        sphereRotate.position.z--;
    }

    render();

    requestAnimationFrame(animate);
}

// Rendering and initialization
// ____________________________

function render() {
    'use strict';

    renderer.render(scene, camera);
}

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