class App {
  init() {
    this.ambientLightColor = 0xffffff;
    this.backgroundColor = '#ffffff';
    this.spotLightColor = 0xffffff;
    this.gridSize = 14;
    this.col = this.gridSize
    this.row = this.gridSize;
    this.shapes = [];
    this.gui = new dat.GUI();

    this.angle = 0;
    this.velocity = .07;
    this.amplitude = -1;
    this.frequency = 0;
    this.waveLength = 190;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(-25.19, 28.52, -23.76);

    this.addRenderer();

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.addAmbientLight();

    this.addSpotLight();

    this.addGrid();

    this.addTowerMaterials();

    this.addCenterTower();

    this.addTowers();

    this.addGUIControls();

    this.animate();

    window.addEventListener('resize', this.onResize.bind(this));
  }

  addTowerMaterials() {
    this.topMaterialProps = {
      color: '#1affa0',
      emissive: '#000000',
    };

    this.insideMaterialProps = {
      color: '#1535cd',
      emissive: '#3e1d1d',
    };

    this.topMaterial = new THREE.MeshStandardMaterial(this.topMaterialProps);
    this.insideMaterial = new THREE.MeshStandardMaterial(this.insideMaterialProps);
  }

  addCenterTower() {
    const materials = [this.insideMaterial, this.insideMaterial, this.topMaterial, this.insideMaterial, this.insideMaterial, this.insideMaterial];
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const cube = new THREE.Mesh(geometry, materials);
    cube.position.y = .5;

    const pivot = new THREE.Object3D();
    pivot.size = 1;
    pivot.add(cube);

    this.shapes.push(pivot);
    this.scene.add(pivot);
  }

  addTowers() {
    const props = {
      steps: 1,
      depth: 1,
      bevelEnabled: false
    };

    const materials = [this.topMaterial, this.insideMaterial];

    for (let index = 1; index < 4; index++) {
      this.shapes.push(this.createSet(props, materials, index, index > 1 ? index - 1 : 0));

      this.scene.add(this.shapes[index]);
    }
  }

  hexToRgbTreeJs(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  createSet(props, materials, size = 1, previous = 0, floorsize = 0) {
    this.floorShape = this.createShape(size, floorsize);

    this.createHole(this.floorShape, size, previous);

    const geometry = new THREE.ExtrudeGeometry(this.floorShape, props);
    const mesh = this.createRectangle(geometry, materials);

    mesh.position.set(0, 0, 0);
    mesh.position.y = 1;

    const pivot = new THREE.Object3D();
    pivot.size = size;

    return pivot.add(mesh);
  }

  createShape(size, floorsize = 0) {
    let dimensition = size;

    if (floorsize) {
      dimensition = floorsize;
    }

    const vectors = [
      new THREE.Vector2(-dimensition, dimensition),
      new THREE.Vector2(-dimensition, -dimensition),
      new THREE.Vector2(dimensition, -dimensition),
      new THREE.Vector2(dimensition, dimensition)
    ];

    const shape = new THREE.Shape(vectors);

    shape.autoClose = true;

    return shape;
  }

  createHole(shape, size, previous = 0) {
    const holePath = new THREE.Path();
    let innerSize = size * .5;

    if (previous) {
      innerSize = previous;
    }

    holePath.moveTo(-innerSize, -innerSize);
    holePath.lineTo(innerSize, -innerSize);
    holePath.lineTo(innerSize, innerSize);
    holePath.lineTo(-innerSize, innerSize);

    holePath.autoClose = false;

    shape.holes.push(holePath);
  }

  createRectangle(geometry, materials) {
    const mesh = new THREE.Mesh(geometry, materials);

    mesh.needsUpdate = true;
    mesh.rotation.set(Math.PI * 0.5, 0, 0);

    return mesh;
  }

  addGUIControls() {
    const backgroundGUI = this.gui.addFolder('Background');
    backgroundGUI.addColor(this, 'backgroundColor').onChange((color) => {
      document.body.style.backgroundColor = color;
    });

    const tileGUI = this.gui.addFolder('Top Material');
    tileGUI.addColor(this.topMaterialProps, 'color').onChange((color) => {
      this.topMaterial.color = this.hexToRgbTreeJs(color);
    });

    tileGUI.addColor(this.topMaterialProps, 'emissive').onChange((emissive) => {
      this.topMaterial.emissive = this.hexToRgbTreeJs(emissive);
    });

    const insideGUI = this.gui.addFolder('Inside Material');
    insideGUI.addColor(this.insideMaterialProps, 'color').onChange((color) => {
      this.insideMaterial.color = this.hexToRgbTreeJs(color);
    });
    insideGUI.addColor(this.insideMaterialProps, 'emissive').onChange((emissive) => {
      this.insideMaterial.emissive = this.hexToRgbTreeJs(emissive);
    });

    const waveGUI = this.gui.addFolder('Wave');
    waveGUI.add(this, 'amplitude', -1, 0);
    waveGUI.add(this, 'velocity', 0, .2);
    waveGUI.add(this, 'waveLength', 150, 500);
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(this.ambientLightColor, 1);
    this.scene.add(light);
  }

  addSpotLight() {
    this.spotLight = new THREE.SpotLight(this.spotLightColor);
    this.spotLight.position.set(-100, 200, 100);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  }

  drawWave() {
    for (let i = 0; i < this.shapes.length; i++) {
      const distance = this.distance(this.shapes[i].position.x + i, this.shapes[i].position.z + i, this.row * .5, this.col * .5);
      const offset = this.map(distance, 0, this.waveLength, -100, 100);
      const angle = this.angle + offset;

      this.shapes[i].scale.y = this.map(Math.sin(angle), -1, -this.amplitude, 0, 20 / this.shapes[i].size * .3);
    }

    this.angle -= this.velocity;
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  map(value, start1, stop1, start2, stop2) {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
  }

  addGrid() {
    const size = this.gridSize;
    const divisions = this.gridSize;
    const gridHelper = new THREE.GridHelper(size, divisions);

    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = .3;
    gridHelper.material.transparent = true;

    this.scene.add(gridHelper);
  }

  animate() {
    this.drawWave();

    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
  }

  onResize() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
  }
}

new App().init();