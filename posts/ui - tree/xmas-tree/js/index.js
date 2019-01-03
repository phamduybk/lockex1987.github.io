(function() {
  (function(window, document, $) {
    "use strict";
    var ChristmasTree;
    ChristmasTree = function() {
      var axis, baseTime, box, boxLines, boxTween, boxTweenSequence, camera, composer, createBoxLine, createComposer, createDecorationParticlesMap, createParticles, createStarLine, createStarMap, createTreeLine, createTreeMap, cycle_span, decoration, decorationParticles, decorationTween, decorationTweenSequence, distance, draw, getTexture, initCamera, initLight, initThree, initialize, max_deepness, particleArray, renderer, resizeTimerId, scene, stage, star, starLines, starTween, tree, treeLines, treeTween, tween, widening;
      treeLines = void 0;
      boxLines = void 0;
      starLines = void 0;
      decorationParticles = void 0;
      renderer = void 0;
      composer = void 0;
      scene = void 0;
      stage = void 0;
      camera = void 0;
      particleArray = [];
      axis = void 0;
      baseTime = +(new Date);
      tree = {
        delay: 2000,
        duration: 800,
        position: {
          x: 0,
          y: 100,
          z: 0
        }
      };
      max_deepness = 3;
      distance = 260;
      widening = 300;
      cycle_span = 5;
      box = {
        duration: 100,
        width: 80,
        height: 60,
        depth: 80,
        sequence: [
          {
            start: 3,
            end: 0
          }, {
            start: 0,
            end: 1
          }, {
            start: 1,
            end: 2
          }, {
            start: 2,
            end: 6
          }, {
            start: 6,
            end: 5
          }, {
            start: 5,
            end: 4
          }, {
            start: 4,
            end: 7
          }, {
            start: 7,
            end: 3
          }, {
            start: 3,
            end: 2
          }, {
            start: 0,
            end: 4
          }, {
            start: 7,
            end: 6
          }, {
            start: 5,
            end: 1
          }
        ],
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      };
      box.vec = [
        {
          x: box.position.x - box.width / 2,
          y: box.position.y + box.height / 2,
          z: box.position.z + box.depth / 2
        }, {
          x: box.position.x + box.width / 2,
          y: box.position.y + box.height / 2,
          z: box.position.z + box.depth / 2
        }, {
          x: box.position.x + box.width / 2,
          y: box.position.y - box.height / 2,
          z: box.position.z + box.depth / 2
        }, {
          x: box.position.x - box.width / 2,
          y: box.position.y - box.height / 2,
          z: box.position.z + box.depth / 2
        }, {
          x: box.position.x - box.width / 2,
          y: box.position.y + box.height / 2,
          z: box.position.z - box.depth / 2
        }, {
          x: box.position.x + box.width / 2,
          y: box.position.y + box.height / 2,
          z: box.position.z - box.depth / 2
        }, {
          x: box.position.x + box.width / 2,
          y: box.position.y - box.height / 2,
          z: box.position.z - box.depth / 2
        }, {
          x: box.position.x - box.width / 2,
          y: box.position.y - box.height / 2,
          z: box.position.z - box.depth / 2
        }
      ];
      star = {
        delay: 100,
        duration: 1000,
        size: 40,
        vertex: 5,
        timing: 0,
        position: {
          x: 0,
          y: 910,
          z: 0
        },
        scale: {
          x: 1,
          y: 1,
          z: 1
        },
        rotation: {
          x: 0,
          y: 0,
          z: Math.PI / 2
        },
        vec: []
      };
      decoration = {
        num: 2000,
        delay: 6000,
        duration: 5,
        range: 5,
        maxY: star.position.y - 30,
        minY: 150,
        widening: 600,
        size: 10,
        texture: void 0,
        color: [0x00fffffff, 0x00ff6600, 0x0099ff99, 0x009999ff, 0x00ffff77, 0x00ff66ee],
        vec: []
      };
      initialize = function() {
        initThree();
        initLight();
        initCamera();
        createComposer(renderer);
        boxLines = createBoxLine();
        boxLines.forEach(function(item, index) {
          scene.add(item.mesh);
        });
        star.vec = createStarMap({
          x: 0,
          y: 0,
          z: 0,
          size: star.size,
          vertex: 5
        });
        starLines = createStarLine();
        starLines.mesh.position.y = star.position.y;
        starLines.mesh.rotation.z = star.rotation.z;
        starLines.mesh.scale.x = 1;
        starLines.mesh.scale.y = 1;
        starLines.mesh.scale.z = 1;
        starLines.mesh.opacity = 0;
        decoration.texture = getTexture();
        decoration.vec = createDecorationParticlesMap();
        decorationParticles = createParticles();
        decorationParticles.forEach(function(item, index) {
          return scene.add(item.mesh);
        });
        createTreeMap().done(function(e) {
          treeLines = e.data.line_map;
          treeLines = createTreeLine(treeLines);
          treeLines.forEach(function(item, index) {
            scene.add(item.mesh);
          });
          draw();
          tween();
        });
      };
      initThree = function() {
        stage = document.getElementById("xmas-junic-world");
        stage.style.width = document.documentElement.clientWidth + "px";
        stage.style.height = document.documentElement.clientHeight + "px";
        renderer = new THREE.WebGLRenderer();
        if (!renderer) {
          alert("Three.js の初期化に失敗しました");
        }
        renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
        stage.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 1.0);
        renderer.autoClear = false;
        scene = new THREE.Scene();
      };
      initCamera = function() {
        camera = new THREE.PerspectiveCamera(45, stage.clientWidth / stage.clientHeight, 1, 10000);
        camera.up = new THREE.Vector3(0, 0, 0);
        camera.lookAt({
          x: 0,
          y: -700,
          z: -1500
        });
        camera.position.set(0, 800, 1500);
      };
      initLight = function() {
        var ambient_light, light;
        light = {};
        light[0] = new THREE.DirectionalLight(0xffffff, 1.0, 0);
        light[0].position.set(0, 0, 1000);
        scene.add(light[0]);
        ambient_light = new THREE.AmbientLight(0xcccccc);
        scene.add(ambient_light);
      };
      draw = function() {
        composer.render();
        requestAnimationFrame(draw);
        TWEEN.update();
        scene.rotation.y = 0.3 * (+(new Date) - baseTime) / 1000;
        starLines.mesh.rotation.y += 0.01;
      };
      tween = function() {
        decorationTweenSequence();
        boxTweenSequence().done(function() {
          var deepness, filtertreeLines, i, ref, results;
          results = [];
          for (deepness = i = 1, ref = max_deepness + 1; 1 <= ref ? i < ref : i > ref; deepness = 1 <= ref ? ++i : --i) {
            filtertreeLines = _.filter(treeLines, function(value, key, object) {
              return value.deepness === deepness;
            });
            results.push(treeTween(filtertreeLines, tree.duration, (deepness - 1) * tree.duration + tree.delay));
          }
          return results;
        });
      };
      starTween = function() {
        scene.add(starLines.mesh);
        starLines.mesh.scale.x = 0.00001;
        starLines.mesh.scale.y = 0.00001;
        starLines.mesh.scale.z = 0.00001;
        starLines.mesh.opacity = 1;
        tween = new TWEEN.Tween({
          timing: 0
        }).to({
          timing: 1
        }, star.duration);
        tween.delay(star.delay).easing(TWEEN.Easing.Elastic.Out).onUpdate(function() {
          starLines.mesh.scale.x = this.timing;
          starLines.mesh.scale.y = this.timing;
          starLines.mesh.scale.z = this.timing;
        }).onComplete(function() {
          console.log('tween end');
        });
        tween.start();
      };
      decorationTweenSequence = function() {
        setTimeout(function() {
          decorationTween(0);
        }, decoration.delay);
      };
      decorationTween = function(num) {
        setTimeout(function() {
          var i, nextNum, range, ref;
          for (range = i = 0, ref = decoration.range - 1; 0 <= ref ? i < ref : i > ref; range = 0 <= ref ? ++i : --i) {
            if (decoration.vec.length > num + range) {
              decorationParticles[num + range].mesh.material.opacity = 1;
              decorationParticles[num + range].mesh.material.needsUpdate = true;
            }
          }
          nextNum = num + decoration.range;
          if (decoration.vec.length - 1 > nextNum) {
            decorationTween(nextNum);
          } else {
            starTween();
          }
        }, decoration.duration);
      };
      boxTweenSequence = function() {
        var $dfd;
        $dfd = $.Deferred();
        box.sequence.forEach(function(item, index) {
          if (index !== box.sequence.length - 1) {
            return boxTween(boxLines[index], item.start, item.end, index * box.duration);
          } else {
            return boxTween(boxLines[index], item.start, item.end, index * box.duration, function() {
              $dfd.resolve();
            });
          }
        });
        return $dfd.promise();
      };
      boxTween = function(boxLine, start, end, delay, fn) {
        var ex, ey, ez, sx, sy, sz;
        sx = box.vec[start].x;
        sy = box.vec[start].y;
        sz = box.vec[start].z;
        ex = box.vec[end].x;
        ey = box.vec[end].y;
        ez = box.vec[end].z;
        tween = new TWEEN.Tween({
          timing: 0,
          x: sx,
          y: sy,
          z: sz
        }).to({
          timing: 1,
          x: ex,
          y: ey,
          z: ez
        }, box.duration).delay(delay).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
          boxLine.geometry.attributes.position.array[3] = this.x;
          boxLine.geometry.attributes.position.array[4] = this.y;
          boxLine.geometry.attributes.position.array[5] = this.z;
          boxLine.geometry.attributes.position.needsUpdate = true;
        }).onComplete(function() {
          if (_.isFunction(fn)) {
            fn();
          }
          console.log('tween end');
        });
        tween.start();
      };
      treeTween = function(treeLines, duration, delay) {
        tween = new TWEEN.Tween({
          timing: 0
        }).to({
          timing: 1
        }, duration);
        tween.delay(delay).easing(TWEEN.Easing.Elastic.Out).onUpdate(function() {
          var timing;
          timing = this.timing;
          treeLines.forEach(function(item, index) {
            item.geometry.attributes.position.array[3] = item.line[1].x * timing;
            item.geometry.attributes.position.array[4] = (max_deepness - item.deepness) * distance * timing * timing + tree.position.y;
            item.geometry.attributes.position.array[5] = item.line[1].z * timing;
            return item.geometry.attributes.position.needsUpdate = true;
          });
        }).onComplete(function() {
          console.log('tween end');
        });
        tween.start();
      };
      createComposer = function(renderer) {
        var effect;
        effect = void 0;
        composer = new THREE.EffectComposer(renderer);
        effect = new THREE.RenderPass(scene, camera);
        composer.addPass(effect);
        effect = new THREE.BloomPass(4.0, 20, 4.0, 120);
        composer.addPass(effect);
        effect = new THREE.ShaderPass(THREE.CopyShader);
        effect.renderToScreen = true;
        composer.addPass(effect);
      };
      createBoxLine = function() {
        boxLines = [];
        box.sequence.forEach(function(item, index) {
          var geometry, material, mesh, p, positions;
          geometry = new THREE.BufferGeometry();
          positions = new Float32Array(2 * 3);
          p = 0;
          positions[p * 3] = box.vec[item.start].x;
          positions[p * 3 + 1] = box.vec[item.start].y;
          positions[p * 3 + 2] = box.vec[item.start].z;
          p = 1;
          positions[p * 3] = box.vec[item.start].x;
          positions[p * 3 + 1] = box.vec[item.start].y;
          positions[p * 3 + 2] = box.vec[item.start].z;
          geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
          material = new THREE.LineBasicMaterial({
            color: 0xffaa3f0a
          });
          mesh = new THREE.Line(geometry, material);
          boxLines[index] = {};
          boxLines[index].geometry = geometry;
          boxLines[index].material = material;
          return boxLines[index].mesh = mesh;
        });
        return boxLines;
      };
      createStarMap = function(setting) {
        var degree, points, rise, size, tx, ty, tz, vertex, x, y, z;
        points = [];
        x = setting.x;
        y = setting.y;
        z = setting.z;
        size = setting.size;
        vertex = setting.vertex;
        rise = 360 / vertex;
        degree = 0;
        while (360 > degree) {
          tx = x + Math.cos(degree * Math.PI / 180) * size;
          ty = y + Math.sin(degree * Math.PI / 180) * size;
          tz = z;
          points.push({
            x: tx,
            y: ty,
            z: tz
          });
          tx = x + Math.cos((degree + 360 / vertex / 2) * Math.PI / 180) * (size / 2);
          ty = y + Math.sin((degree + 360 / vertex / 2) * Math.PI / 180) * (size / 2);
          tz = z;
          points.push({
            x: tx,
            y: ty,
            z: tz
          });
          degree += rise;
        }
        return points;
      };
      createStarLine = function() {
        var geometry, material, positions;
        starLines = {};
        geometry = new THREE.BufferGeometry();
        material = new THREE.LineBasicMaterial({
          color: 0xffffff00
        });
        positions = new Float32Array(star.vec.length * 3 * 2);
        star.vec.forEach(function(item, index) {
          var next, p;
          p = index * 2;
          positions[p * 3] = star.vec[index].x;
          positions[p * 3 + 1] = star.vec[index].y;
          positions[p * 3 + 2] = star.vec[index].z;
          next = index + 1;
          if (star.vec.length === next) {
            next = 0;
          }
          p = index * 2 + 1;
          positions[p * 3] = star.vec[next].x;
          positions[p * 3 + 1] = star.vec[next].y;
          positions[p * 3 + 2] = star.vec[next].z;
        });
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        starLines.mesh = new THREE.Line(geometry, material);
        return starLines;
      };
      createTreeMap = function() {
        var $dfd, param, worker;
        $dfd = $.Deferred();
        param = {
          cmd: "line",
          widening: widening,
          max_deepness: max_deepness,
          cycle_span: cycle_span,
          position: {
            x: tree.position.x,
            z: tree.position.z
          }
        };
        worker = new Worker(window.URL.createObjectURL(new Blob([document.getElementById("worker").innerHTML.replace(/&gt;/g, ">").replace(/&lt;/g, "<")], {
          type: "text/javascript"
        })));
        worker.addEventListener("message", (function(e) {
          return $dfd.resolve(e);
        }), false);
        worker.postMessage(param);
        return $dfd.promise();
      };
      createTreeLine = function(treeLines) {
        treeLines.forEach(function(item, index) {
          var colors, geometry, material, mesh, p, positions;
          geometry = new THREE.BufferGeometry();
          positions = new Float32Array(item.line.length * 3);
          colors = new Float32Array(item.line.length * 3);
          p = 0;
          positions[p * 3] = item.line[0].x;
          positions[p * 3 + 1] = (max_deepness - item.deepness + 1) * distance + tree.position.y;
          positions[p * 3 + 2] = item.line[0].z;
          colors[p * 3] = 1;
          colors[p * 3 + 1] = 1;
          colors[p * 3 + 2] = 1;
          p = 1;
          positions[p * 3] = item.line[0].x;
          positions[p * 3 + 1] = (max_deepness - item.deepness + 1) * distance + tree.position.y;
          positions[p * 3 + 2] = item.line[0].z;
          colors[p * 3] = 1;
          colors[p * 3 + 1] = 1;
          colors[p * 3 + 2] = 1;
          geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
          material = new THREE.LineBasicMaterial({
            color: 0xff247f4d
          });
          mesh = new THREE.Line(geometry, material);
          treeLines[index].geometry = geometry;
          treeLines[index].material = material;
          return treeLines[index].mesh = mesh;
        });
        return treeLines;
      };
      createDecorationParticlesMap = function() {
        var base, deepness, degree, diff, i, points, radian, radius, rand, ref, timing, x, y, z;
        points = [];
        base = decoration.maxY - decoration.minY;
        for (deepness = i = 0, ref = decoration.num; 0 <= ref ? i < ref : i > ref; deepness = 0 <= ref ? ++i : --i) {
          rand = Math.random();
          degree = 360 * rand;
          diff = base * rand * rand;
          timing = 1.15 - diff / base;
          radius = widening * timing * timing;
          radian = degree * Math.PI;
          y = decoration.minY + diff;
          x = radius * Math.cos(radian);
          z = radius * Math.sin(radian);
          points.push({
            x: x,
            y: y,
            z: z
          });
        }
        points = _.sortBy(points, 'y');
        return points;
      };
      createParticles = function() {
        decorationParticles = [];
        decoration.vec.forEach(function(item, index) {
          var color, colors, geometry, material, mesh, p, positions;
          geometry = new THREE.BufferGeometry();
          positions = new Float32Array(3);
          colors = new Float32Array(3);
          p = 0;
          positions[p * 3] = item.x;
          positions[p * 3 + 1] = item.y;
          positions[p * 3 + 2] = item.z;
          colors[p * 3] = 1;
          colors[p * 3 + 1] = 1;
          colors[p * 3 + 2] = 1;
          geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
          color = decoration.color[Math.floor(decoration.color.length * Math.random())];
          material = new THREE.PointCloudMaterial({
            color: color,
            map: decoration.texture,
            size: decoration.size
          });
          material.opacity = 0;
          material.transparent = true;
          mesh = new THREE.PointCloud(geometry, material);
          decorationParticles[index] = {};
          decorationParticles[index].geometry = geometry;
          decorationParticles[index].material = material;
          return decorationParticles[index].mesh = mesh;
        });
        return decorationParticles;
      };
      getTexture = function() {
        var canvas, gradient, particleContext, texture;
        canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        particleContext = canvas.getContext("2d");
        gradient = particleContext.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
        gradient.addColorStop(0.01, "rgba( 255, 255, 255, 1.0 )");
        gradient.addColorStop(0.3, "rgba(  255, 255, 255, 0.8 )");
        gradient.addColorStop(1, "rgba( 0, 0, 0, 0 )");
        particleContext.fillStyle = gradient;
        particleContext.fillRect(0, 0, canvas.width, canvas.height);
        texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      resizeTimerId = void 0;
      $(window).on("resize", function() {
        clearTimeout(resizeTimerId);
        resizeTimerId = setTimeout(function() {
          stage.style.width = document.documentElement.clientWidth + "px";
          stage.style.height = document.documentElement.clientHeight + "px";
          renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
          composer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
          camera.aspect = stage.clientWidth / stage.clientHeight;
          camera.updateProjectionMatrix();
          console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
        }, 30);
      });
      initialize();
    };
    return $(window).on('load', ChristmasTree);
  })(window, document, jQuery);

}).call(this);