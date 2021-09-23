import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';
let scene, camera, renderer, density, color;


function init() {

  scene = new THREE.Scene();
  density = 0.00009;
  color = '#918e94';
  scene.fog = new THREE.FogExp2(color, density);


// Setting up Camera, renderer and actual distance that you can scroll
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(6060,2481,3225);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera,renderer.domElement);
  controls.addEventListener('change', renderer);
  controls.minDistance = 200;
  controls.maxDistance = 6500;
  controls.maxPolarAngle = Math.PI / 2;
  




  // Listener that scale the scene when you change size of website
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });




// Setting up light
  let light = new THREE.DirectionalLight(0xFFFFFF, 0.9);
    light.position.set(20, 200, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    scene.add(light);




// Sky box
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( 'resources/meadow_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'resources/meadow_bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'resources/meadow_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'resources/meadow_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'resources/meadow_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'resources/meadow_lf.jpg');

    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 20000, 20000, 20000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );  

  //Grass floor
  let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20000, 20000, 300, 300),
    new THREE.MeshStandardMaterial({
        map:texture_dn
    })

);


floor.rotation.x = -Math.PI / 2.0;
scene.add(floor);




// Loading 3D object using OBJLoader for object and MTLLoader for materials/textures
const mtlLoader = new MTLLoader();
mtlLoader.load('casa/casa_bosque.mtl', (mtl) => {
  mtl.preload();
  const loaderObj = new THREE.OBJLoader();
  loaderObj.setMaterials(mtl);
  loaderObj.load('casa/casa bosque.obj', (event) => {
    event.position.set(2000,-5,530);
    scene.add(event);
    
  });
});

const mtlLoader2 = new MTLLoader();
    mtlLoader2.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', (mtl) => {
      mtl.preload();
      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
        root.scale.set(150, (Math.random() + 1.0) * 100.0, 150);
        scene.add(root);
      });
    });





//Load trees on random location
  for (let x = 0; x < 20; ++x) {
    for (let y = 0; y < 30; ++y) {

      const mtlLoader3 = new MTLLoader();
      mtlLoader3.load('resources/Lowpoly_tree_sample.mtl', (mtl) => {
        mtl.preload();
        const loaderObj3 = new THREE.OBJLoader();
        loaderObj3.setMaterials(mtl);
        loaderObj3.load('resources/Lowpoly_tree_sample.obj', (event) => {
          event.scale.set(20, (Math.random() + 1.0) * 10.0, 20);
          event.position.set(
                  8500.0 * (Math.random() * 2.0 - 1.0),
                  50,
                  8500.0 * (Math.random() * 2.0 - 1.0));
          scene.add(event);
          
        });
      });
  
    }
  }

  animate();
}

function animate() {

  
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  controls.update();
}
init();



