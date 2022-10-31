import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,10)
camera.lookAt(scene.position);
scene.background = new THREE.Color(0xffffff);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('canvas') as HTMLCanvasElement
});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const helper = new THREE.GridHelper(100, 100);
helper.rotateX(Math.PI / 2);
scene.add(helper);


const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createWall(){

    let shape = new THREE.Shape();
    shape.moveTo(1, 1);
    shape.lineTo(4,1);
    shape.lineTo(4,4);
    shape.lineTo(3,4);
    shape.lineTo(3,2);
    shape.lineTo(1,2);
    shape.lineTo(1,1);


    let extrudeSettings = {
        depth: 4,
        bevelEnabled: false,
    }
    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}

createWall();

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

