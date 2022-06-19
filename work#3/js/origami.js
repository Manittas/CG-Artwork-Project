// Global and Object Variables
// _________________________

var camera, camera1, camera2;
var scene, renderer;

var firstStep, secondStep, podiumFloor;
var firstOrigami, secondOrigami, thirdOrigami;

// clock
var clock = new THREE.Clock();

// rotation key flags
var flagPress1, flagPress2, flagPress3;
var flagQ, flagW, flagE, flagR, flagT, flagY;

// shading flags
var flagPhong = false, flagShadeCalc = true;

// lighting key flags
var dLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
var sLight1 = new THREE.SpotLight(0xFFFFFF, 1);
var sLight2 = new THREE.SpotLight(0xFFFFFF, 1);
var sLight3 = new THREE.SpotLight(0xFFFFFF, 1);

// pause
var pause;

// Materials
// _________________________

var materials = {
    brightWhite: new THREE.MeshLambertMaterial({ color: 0xf4f5f0}),
    brightWhitePhong: new THREE.MeshPhongMaterial({ color: 0xf4f5f0}),
    brightWhiteBasic: new THREE.MeshBasicMaterial({ color: 0xf4f5f0}),
    origamiPaper: new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load('js/textures/origamiPaper.jpg')}),
    origamiPaperPhong: new THREE.MeshPhongMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load('js/textures/origamiPaper.jpg')}),
    origamiPaperBasic: new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load('js/textures/origamiPaper.jpg')}),
    blackC: new THREE.MeshStandardMaterial({ color: 0x2d2926}),
    pauseImage: new THREE.SpriteMaterial({map: new THREE.TextureLoader().load('js/textures/pause.png')}),
}

materials.brightWhitePhong.setValues({ specular: 0x3e3c3c, shininess: 30});
materials.origamiPaperPhong.setValues({ specular: 0x3e3c3c, shininess: 30});

// Geometries
// _________________________

var geometries = {
    cone: new THREE.ConeGeometry(9, 45, 16),
    origami1: new THREE.BufferGeometry(),
    origami2: new THREE.BufferGeometry(),
    origami3: new THREE.BufferGeometry(),
    parallelepiped: new THREE.BoxGeometry(1, 1, 1, 8, 8, 8),
    sphere: new THREE.SphereGeometry(12, 32, 32),
}

// Objects
// _________________________

function createPodium(c) {
    'use strict';

    var podium = new THREE.Group();

    firstStep = new THREE.Mesh(geometries.parallelepiped, c);

    firstStep.position.set(0, 25, 0);
    firstStep.scale.x = 850;
    firstStep.scale.y = 50;
    firstStep.scale.z = 450;

    secondStep = new THREE.Mesh(geometries.parallelepiped, c);

    secondStep.position.set(0, 75, 0);
    secondStep.scale.x = 750;
    secondStep.scale.y = 50;
    secondStep.scale.z = 350;

    podiumFloor = new THREE.Mesh(geometries.parallelepiped, c);

    podiumFloor.position.set(0, 125, 0);
    podiumFloor.scale.x = 650;
    podiumFloor.scale.y = 50;
    podiumFloor.scale.z = 250;

    podium.add(firstStep, secondStep, podiumFloor);

    podium.position.set(0, -175, 0);

    scene.add(podium);
}

function createFirstOrigami(c) {
    'use strict';

    var vertices = new Float32Array([
        -1.0, -1.0,  -15.0,
        1.0, -1.0,  15.0,
        1.0,  1.0,  -15.0,

        1.0,  1.0,  -15.0,
        -1.0,  1.0,  15.0,
        -1.0, -1.0, -15.0
    ]);

    var indexes = [
        0, 1, 2,
        3, 4, 5
    ];

    var normals = new Float32Array([
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
    ]);

    var uv = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0
    ]);

    geometries.origami1.setIndex(indexes);
    geometries.origami1.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometries.origami1.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometries.origami1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    firstOrigami = new THREE.Mesh(geometries.origami1, c);

    firstOrigami.position.set(-200, 100, 0);
    firstOrigami.scale.x = 75;
    firstOrigami.scale.y = 75;
    firstOrigami.rotateZ(Math.PI / 4);

    scene.add(firstOrigami);
}

function createSecondOrigami(c) {
    'use strict';

    var vertices = new Float32Array([
        -1.0, -1.0, -12.0, 
        0.85, -0.15, 12.0,
        1.0, 1.0, -12.0,

        1.0, 1.0, -12.0, 
        -0.15, 0.85, 12.0,  
        -1.0, -1.0, -12.0, 

        0.0, 0.0, -12.0, 
        0.75, 0, 11.5,  
        0.85, -0.15, 12.0, 

        -0.15, 0.85, 12.0,  
        0, 0.75, 11.5,   
        0.0, 0.0, -12.0
    ]);

    var indexes = [
        0, 1, 2, 
        3, 4, 5,
        6, 7, 8,
        9, 10, 11
    ];

    var normals = new Float32Array([
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
    ]);

    var uv = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
    ]);

    geometries.origami2.setIndex(indexes);
    geometries.origami2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometries.origami2.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometries.origami2.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    secondOrigami = new THREE.Mesh(geometries.origami2, c);

    secondOrigami.position.set(0, 100, 0);
    secondOrigami.scale.x = 75;
    secondOrigami.scale.y = 75;
    secondOrigami.rotateZ(Math.PI / 4);

    scene.add(secondOrigami);
}

function createThirdOrigami(c) {
    'use strict';

    var vertices = new Float32Array([
        -0.75, -1.0, 0.0,
        0.75, -1.0, 0.0,
        1.0, 0.1, 0.0,

        1.0, 0.1, 0.0,
        -1.0, 0.25, 0.0,
        -0.75, -1.0, 0.0,

        -0.75, -1.0, 0.0,
        -0.15, -1.0, 0.0,
        -0.5, 0.25 , 5.0,

        0.75, -1.0, 0.0,
        1.0, 0.1, 0.0,
        0.75, 2.0, 5.0
    ]);

    var indexes = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
    ];

    var normals = new Float32Array([
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
    ]);

    var uv = new Float32Array([
        0.0, 0.0, 
        1.0, 0.0, 
        1.0, 1.0, 
        1.0, 1.0, 
        0.0, 1.0, 
        0.0, 0.0
    ]);

    geometries.origami3.setIndex(indexes);
    geometries.origami3.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometries.origami3.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometries.origami3.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    thirdOrigami = new THREE.Mesh(geometries.origami3, c);

    thirdOrigami.position.set(200, 100, 0);
    thirdOrigami.scale.x = 75;
    thirdOrigami.scale.y = 75;

    scene.add(thirdOrigami);
}

function createSpotlight(x, y, z) {
    'use strict'

    var body = new THREE.Mesh(geometries.sphere, materials.blackC);

    body.position.set(x, y, z);
    scene.add(body);

    var viewCone = new THREE.Mesh(geometries.cone, materials.blackC);

    viewCone.rotateX(Math.PI / 2);
    viewCone.position.set(0, 0, -5);

    body.add(viewCone);
}

function createPauseScreen(){
    'use strict'

    pause = new THREE.Sprite(materials.pauseImage);
    pause.scale.x = window.innerWidth / 2;
    pause.scale.y = window.innerHeight / 2;

    scene.add(pause);
    pause.position.set(350, 35, 350);
    pause.visible = false;
}

// Scene
// _________________________

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createPodium(materials.brightWhite);
    createFirstOrigami(materials.origamiPaper);
    createSecondOrigami(materials.origamiPaper);
    createThirdOrigami(materials.origamiPaper);

    scene.add(dLight);
    dLight.position.set(100, 250, 100);
    dLight.target.position.set(0, -175, 0);

    // spotlight 1
    createSpotlight(-200, -12, 100);
    scene.add(sLight1);
    sLight1.position.set(-200, -12, 100);
    sLight1.target = firstOrigami;

    // spotlight 2
    createSpotlight(0, -12, 100);
    scene.add(sLight2);
    sLight2.position.set(0, -12, 100);
    sLight2.target = secondOrigami;

    // spotlight 3
    createSpotlight(200, -12, 100);
    scene.add(sLight3);
    sLight3.position.set(200, -12, 100);
    sLight3.target = thirdOrigami;

    // initial lighting
    dLight.visible = true;
    sLight1.visible = false;
    sLight2.visible = false;
    sLight3.visible = false;
}

// Cameras
// _________________________

function createCamera() {
    'use strict';

    camera1 = new THREE.PerspectiveCamera(90,
                                         window.innerWidth / window.innerHeight,
                                         0.1,
                                         1500);
    camera1.position.x = 500;
    camera1.position.y = 50;
    camera1.position.z = 500;

    camera2 = new THREE.OrthographicCamera(- window.innerWidth / 2, 
                                          window.innerWidth / 2,
                                          window.innerHeight / 2,
                                          - window.innerHeight / 2,
                                          0,
                                          1500);
    camera2.position.x = 0;
    camera2.position.y = 0;
    camera2.position.z = 500;

    camera = camera1;
    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);

    createPauseScreen();
}

// Functionalities and Callbacks
// _____________________________

function changeShaders() {
    if(flagPhong) {
        firstStep.material = materials.brightWhite;
        secondStep.material = materials.brightWhite;
        podiumFloor.material = materials.brightWhite;
        firstOrigami.material = materials.origamiPaper;
        secondOrigami.material = materials.origamiPaper;
        thirdOrigami.material = materials.origamiPaper;
    }
    else {
        firstStep.material = materials.brightWhitePhong;
        secondStep.material = materials.brightWhitePhong;
        podiumFloor.material = materials.brightWhitePhong;
        firstOrigami.material = materials.origamiPaperPhong;
        secondOrigami.material = materials.origamiPaperPhong;
        thirdOrigami.material = materials.origamiPaperPhong;
    }

    flagPhong = !flagPhong;
}

function changeLighting() {
    if(flagShadeCalc) {
        firstStep.material = materials.brightWhiteBasic;
        secondStep.material = materials.brightWhiteBasic;
        podiumFloor.material = materials.brightWhiteBasic;
        firstOrigami.material = materials.origamiPaperBasic;
        secondOrigami.material = materials.origamiPaperBasic;
        thirdOrigami.material = materials.origamiPaperBasic;
    }
    else {
        firstStep.material = materials.brightWhite;
        secondStep.material = materials.brightWhite;
        podiumFloor.material = materials.brightWhite;
        firstOrigami.material = materials.origamiPaper;
        secondOrigami.material = materials.origamiPaper;
        thirdOrigami.material = materials.origamiPaper;
        flagPhong = false;
    }
    
    flagShadeCalc = !flagShadeCalc;
}

function togglePaused() {
    'use strict'

    if(clock.running) {
        clock.stop();
    }
    else {
        clock.start();
    }

    pause.visible = !pause.visible;
}

function toggleWireframe() {
    Object.values(materials).forEach((material) => material.wireframe = !material.wireframe);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        // Orthographic camera
        if(camera instanceof THREE.OrthographicCamera) {
            camera.left = - window.innerWidth / 2;
            camera.right = window.innerWidth / 2;
            camera.top = window.innerHeight / 2;
            camera.bottom = - window.innerHeight / 2;
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
            pause.position.set(350, 35, 350);
            break;
        case 50: //2
            camera = camera2;
            pause.position.set(0, 0, 500);
            break;

        // Wireframe key
        case 52: //4
            toggleWireframe();
            break;

        // Rotation keys
        case 81: //q
            flagPress1 = true;
            flagQ = true;
            break;
        case 87: //w
            flagPress1 = true;
            flagW = true;
            break;
        case 69: //e
            flagPress2 = true;
            flagE = true;
            break;
        case 82: //r
            flagPress2 = true;
            flagR = true;
            break;
        case 84: //t
            flagPress3 = true;
            flagT = true;
            break;
        case 89: //y
            flagPress3 = true;
            flagY = true;
            break;
        
        // shading keys
        case 65: //a
            changeShaders();
            break;
        case 83: //s
            changeLighting();
            break;

        // lighting keys
        case 68: //d
            dLight.visible = !dLight.visible;
            break;
        case 90: //z
            sLight1.visible = !sLight1.visible;
            break;
        case 88: //x
            sLight2.visible = !sLight2.visible;
            break;
        case 67: //c
            sLight3.visible = !sLight3.visible;
            break;

        // pause keys
        case 32: //space
            togglePaused();
            break;
            case 51: //3
            if(!clock.running) {
                firstOrigami.rotation.y = 0;
                secondOrigami.rotation.y = 0;
                thirdOrigami.rotation.y = 0;
                camera = camera1;
                pause.position.set(350, 35, 350);
            }
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

        // Rotation keys
        case 81: //q
            if(!flagW){
                flagPress1 = false;
            }
            flagQ = false;
            break;
        case 87: //w
            if(!flagQ){
                flagPress1 = false;
            }
            flagW = false;
            break;
        case 69: //e
            if(!flagR){
                flagPress2 = false;
            }
            flagE = false;
            break;
        case 82: //r
            if(!flagE){
                flagPress2 = false;
            }
            flagR = false;
            break
        case 84: //t
            if(!flagY){
                flagPress3 = false;
            }
            flagT = false;
            break;
        case 89: //y
            if(!flagT){
                flagPress3 = false;
            }
            flagY = false;
            break;
    }
}

// Animate
// _________________________

function animate() {
    'use strict';

    let speed = 3;
    let delta = clock.getDelta();

    if (clock.running) {
        // Rotation animations
        if (flagPress1 && flagQ) firstOrigami.rotation.y += speed * delta;
        if (flagPress1 && flagW) firstOrigami.rotation.y -= speed * delta;

        if (flagPress2 && flagE) secondOrigami.rotation.y += speed * delta;
        if (flagPress2 && flagR) secondOrigami.rotation.y -= speed * delta;

        if (flagPress3 && flagT) thirdOrigami.rotation.y += speed * delta;
        if (flagPress3 && flagY) thirdOrigami.rotation.y -= speed * delta;
    }
    
    render();
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

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    renderer.setAnimationLoop(animate)

    createScene();
    createCamera();
    
    clock.start();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}