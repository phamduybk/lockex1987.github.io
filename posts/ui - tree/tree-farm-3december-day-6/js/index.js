console.clear();

var scene, camera, renderer, orbit, light;

scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xF4F4F6, 20, 200);

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 10, 200 );
camera.position.z = 70;
camera.position.y = 40;
camera.position.x = 60;
camera.updateProjectionMatrix();

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xF4F4F6 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.gammaInput = true;
//renderer.gammaOutput = true;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement );

/*////////////////////////////////////////*/

orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = true;
orbit.enablePan = true;
orbit.autoRotate = true;
orbit.autoRotateSpeed = 0.3;
orbit.minPolarAngle = 0;
orbit.maxPolarAngle = Math.PI * 0.45;
orbit.minDistance = 20;
orbit.maxDistance = 170;

/*////////////////////////////////////////*/

// var ambient = new THREE.AmbientLight( 0x444444 );
// scene.add( ambient );

let light2 = new THREE.PointLight( 0xFCE38A, 0.1, 0, Math.PI / 2 );
light2.position.set( 0, 150, -100 );
//light2.castShadow = true;
scene.add(light2);


light = new THREE.PointLight( 0xFCE3E3, 0.4, 0, Math.PI / 2 );
light.position.set( 50, 180, 200 );

light.castShadow = true;

light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

// var d = 200;

// light.shadow.camera.left = -d;
// light.shadow.camera.right = d;
// light.shadow.camera.top = 200;
// light.shadow.camera.bottom = -d;

light.shadow.camera.far = 400;
light.shadow.bias = 0.9;
light.shadow.radius = 40;

scene.add( light );


let hemiLight = new THREE.HemisphereLight( 0xEBF7FD, 0xEBF7FD, 0.7 );
//hemiLight.color.setRGB(0.75,0.8,0.95);
hemiLight.position.set( 0, 100, 0 );
scene.add( hemiLight );


/*////////////////////////////////////////*/

let landscapeGroup = new THREE.Object3D();
scene.add(landscapeGroup);

let geometry = new THREE.PlaneGeometry( 400, 400, 10, 10 );

function noiseMap(size,intensity){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      width = canvas.width = size || 512,
      height = canvas.height = size || 512;

  intensity = intensity || 120;

  var imageData = ctx.getImageData(0, 0, width, height),
      pixels = imageData.data,
      n = pixels.length,
      i = 0;
  
  while (i < n) {
    pixels[i++] = pixels[i++] = pixels[i++] = Math.sin( i * i * i + (i/n) * Math.PI) * intensity; //+ (random() * 256) | 0;
    pixels[i++] = 255;// * Math.random();
  }
  ctx.putImageData(imageData, 0, 0);
  
  let sprite = new THREE.Texture(canvas);
  sprite.needsUpdate = true;

  return sprite;
}

let material = new THREE.MeshPhongMaterial({ 
  color: 0xdddddd, 
  shininess: 1000,
  //metalness: 1,
  //specularMap: noiseMap(512,255),
  bumpMap: noiseMap(1024,255),
  //displacementScale: 0.1,// new THREE.Vector2(0.25, 0.25),
  bumpScale: 0.025,
  emissive: 0xEBF7FD,
  emissiveIntensity: 0.2,
  side: THREE.DoubleSide,
  shading: THREE.SmoothShading
}); 
let plane = new THREE.Mesh( geometry, material );
//plane.castShadow = true;
plane.receiveShadow = true;

landscapeGroup.add( plane );

/*////////////////////////////////////////*/

let treeMaterial = new THREE.MeshPhongMaterial( {
  color: 0x2C9E4B,
  shininess: 20,
  //bumpMap: noiseMap(256, 5),
  //bumpScale: 0.5,
  side: THREE.FrontSide,
  shading: THREE.SmoothShading
});

function Cone(size, translate){
  size = size || 10;
  this.geometry = new THREE.CylinderGeometry( size / 2, size, size, 6 );
  if ( translate ) {
    this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, size, 0) );
  }
  THREE.Mesh.call(this, this.geometry, treeMaterial);
}

Cone.prototype = Object.assign(THREE.Mesh.prototype,{ 
  constructor: Cone,
});

function Tree(size) {

  size = size || 6 + Math.random();

  THREE.Object3D.call(this);

  let lastCone;
  let cone;

  for (let i = 0; i < size; i++) { 
    cone = new Cone( (size - i) + 1, i);
    cone.position.y = 0;
    if ( lastCone ) { 
      let box = new THREE.Box3().setFromObject( lastCone );
      cone.position.y = (box.max.y + box.min.y) / 2;
    } else {
      cone.position.y += 2;
    }
    lastCone = cone;
    cone.castShadow = true;
    cone.receiveShadow = true;
    this.add( cone );
  }

};

Tree.prototype = Object.assign(THREE.Object3D.prototype,{ 
  constructor: Tree,
});

/*////////////////////////////////////////*/

let trees = [];

for (let i = 0; i < plane.geometry.vertices.length; i++) {
  plane.geometry.vertices[i].z = Math.sin(i * i) * 6; //(Math.random() - 0.5) * 10;

  let tree = new Tree;
  tree.rotation.x = Math.PI/-2;

  tree.position.copy(plane.geometry.vertices[i]);
  tree.position.x += ( Math.random() - 0.5 ) * 2;//(treeCount/2 - i) * 30;
  tree.position.y += 2 * ( Math.random() - 0.5 );
  trees.push(tree);
  landscapeGroup.add(tree);
}

landscapeGroup.rotation.x = Math.PI/2;
//plane.position.y = 10;
plane.geometry.verticesNeedUpdate = true;
plane.geometry.normalsNeedUpdate = true;
plane.geometry.computeFaceNormals(); 


/*////////////////////////////////////////*/


function makeSprite(){
  const PI2 = Math.PI * 2;
  let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  let spriteSize = 8;
  canvas.width = canvas.height = spriteSize * 2;
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc( spriteSize, spriteSize, spriteSize, 0, PI2, true );
  ctx.fill();

  let sprite = new THREE.Texture(canvas);
  sprite.needsUpdate = true;

  return sprite;
}

function pointsParticles(){

  let pointGeometry = new THREE.Geometry();

  for ( i = 0; i < 200; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 150 - 75;
    vertex.y = Math.random() * 200;
    vertex.z = Math.random() * 150 - 75;
    pointGeometry.vertices.push( vertex );
  }

  pointGeometry.verticesNeedUpdate = true;
  pointGeometry.normalsNeedUpdate = true;
  pointGeometry.computeFaceNormals(); 

  let pointMaterial = new THREE.PointsMaterial( { 
    //size: 16, 
    map: makeSprite(), 
    blending: THREE.AdditiveBlending, 
    depthTest: true, 
    transparent : true
  });

  particles = new THREE.Points( pointGeometry, pointMaterial );
  scene.add(particles);
  console.log( particles.geometry );//.length, Object.keys(particles) );

  return function(count){
    particles.geometry.vertices.forEach( (vertex, i) => {
      vertex.x += Math.sin(count + i) * 0.1;
      vertex.y -= 0.2;
      if ( vertex.y < 0 ) { vertex.y = 200; }
    });
    particles.geometry.verticesNeedUpdate = true; 
  }
}
let updateParticles = pointsParticles();

/*////////////////////////////////////////*/

let count = 0;

function render () {
  requestAnimationFrame( render );
  count += 0.02;
  orbit.update();
  if ( updateParticles ) { updateParticles(count); }
  renderer.render( scene, camera );
};

render();