console.clear();

// Config
// ------------------------

const verticesPerEdge = window.innerWidth < 1000 ? 12 : 16;
const flowerBoxScaleMin = -1;
const flowerBoxScaleMax = 1.25;
const flowerBoxDuration = 16000;
const weightFn = x => x ** 1.25;
const cameraDistance = 8;
const sceneScale = 0.9;

//   World Orientation
// ---------------------
//          -y  -z
//           | /
//     ______|/_____
//     -x   /|    +x
//         / |
//       +z  +y

// Lightweight canvas adapter. All drawing code is still native 2D canvas commands.
const stage = new SimpleStage({ container: document.body });

// Constants
const TAU = Math.PI * 2;

// State
// ----------------------
let animate = true;
let drawNormalLines = false;
let drawNormalColors = false;
// Running time of the flower box animation.
// Start off part way in, as initial ease is slow and can almost look static for a second.
let runtime = flowerBoxDuration * 0.1;
// Animate rotation along 2 axes, Y and Z.
let rotationAutoY = 0;
let rotationAutoZ = 0;
// The rendered rotation (note: interactive rotation is tracked further down).
let rotationFinalY = 0;
let rotationFinalZ = 0;



// Helpers
// ----------------------

// Animation Helpers
const lerp = (a, b, x) => (b - a) * x + a;
function easeInOut(p) {
	if (p < 0.5) {
		p = p * 2;
		return p * p * 0.5;
	} else {
		p = 1 - (p - 0.5) * 2
		return 1 - p * p * 0.5;
	}
}
function yoyo(p) {
	if (p < 0.5) {
		return p * 2;
	} else {
		return 1 - (p - 0.5) * 2;
	}
}

// Clone array and all vertices.
function cloneVertices(vertices) {
	return vertices.map(vertex => ({ ...vertex }));
}

// Compute triangle midpoint.
// Mutates `middle` property of given `poly`.
function computeTriMiddle(poly) {
	const v = poly.vertices;
	poly.middle.x = (v[0].x + v[1].x + v[2].x) / 3;
	poly.middle.y = (v[0].y + v[1].y + v[2].y) / 3;
	poly.middle.z = (v[0].z + v[1].z + v[2].z) / 3;
}

// Compute quad midpoint.
// Mutates `middle` property of given `poly`.
function computeQuadMiddle(poly) {
	const v = poly.vertices;
	poly.middle.x = (v[0].x + v[1].x + v[2].x + v[3].x) / 4;
	poly.middle.y = (v[0].y + v[1].y + v[2].y + v[3].y) / 4;
	poly.middle.z = (v[0].z + v[1].z + v[2].z + v[3].z) / 4;
}

function computePolyMiddle(poly) {
	if (poly.vertices.length === 3) {
		computeTriMiddle(poly);
	} else {
		computeQuadMiddle(poly);
	}
}

// Compute distance from any polygon (tri or quad) midpoint to camera.
// Sets `depth` property of given `poly`.
// Also triggers midpoint calculation, which mutates `middle` property of `poly`.
function computePolyDepth(poly) {
	computePolyMiddle(poly);
	const dX = poly.middle.x;
	const dY = poly.middle.y;
	const dZ = poly.middle.z - cameraDistance;
	poly.depth = Math.sqrt(dX*dX + dY*dY + dZ*dZ);
}

// Compute normal of any polygon. Uses normalized vector cross product.
// Mutates `normalName` property of given `poly`.
function computePolyNormal(poly, normalName) {
	// Store quick refs to vertices
	const v1 = poly.vertices[0];
	const v2 = poly.vertices[1];
	const v3 = poly.vertices[2];
	// Calculate difference of vertices, following winding order.
	const ax = v1.x - v2.x;
	const ay = v1.y - v2.y;
	const az = v1.z - v2.z;
	const bx = v1.x - v3.x;
	const by = v1.y - v3.y;
	const bz = v1.z - v3.z;
	// Cross product
	const nx = ay*bz - az*by;
	const ny = az*bx - ax*bz;
	const nz = ax*by - ay*bx;
	// Compute magnitude of normal and normalize
	const mag = Math.sqrt(nx*nx + ny*ny + nz*nz);
	const polyNormal = poly[normalName];
	polyNormal.x = nx / mag;
	polyNormal.y = ny / mag;
	polyNormal.z = nz / mag;
}


// Define models once. The origin is the center of the model.
function makePlaneModel({ edgeVertCount=2, hue=0, vOffset=0 }) {
	const vertices = [];
	const polys = [];

	const width = 2;
	const startPos = width / -2;
	const inc = width / (edgeVertCount - 1);
	const maxDistance = Math.sqrt(startPos*startPos + startPos*startPos);
	
	for (let x=0; x<edgeVertCount; x++) {
		for (let y=0; y<edgeVertCount; y++) {
			const xPos = x*inc + startPos;
			const zPos = y*inc + startPos;
			
			vertices.push({
				x: xPos,
				y: -1,
				z: zPos,
				distance: Math.sqrt(xPos*xPos + zPos*zPos) / maxDistance
			});
			
			if (x > 0 && y > 0) {
				const currentIndex = x*edgeVertCount + y;
				polys.push({
					vIndexes: [
						currentIndex - edgeVertCount + vOffset,
						currentIndex - edgeVertCount - 1 + vOffset,
						currentIndex - 1 + vOffset
					],
					color: { h: hue, s: 80, l: 50 }
				});
				polys.push({
					vIndexes: [
						currentIndex - edgeVertCount + vOffset,
						currentIndex - 1 + vOffset,
						currentIndex + vOffset
					],
					color: { h: hue, s: 80, l: 50 }
				});
			}
		}
	}
	
	return { vertices, polys };
};

// A cube, arbitrarily subdivided.
function makeCubeModel(edgeVertCount=2) {
	const vCount = edgeVertCount * edgeVertCount;
	const planeTop = makePlaneModel({ edgeVertCount, hue: 0, vOffset: 0 });
	const planeBottom = makePlaneModel({ edgeVertCount, hue: 60, vOffset: vCount });
	const planeLeft = makePlaneModel({ edgeVertCount, hue: 120, vOffset: vCount*2 });
	const planeRight = makePlaneModel({ edgeVertCount, hue: 180, vOffset: vCount*3 });
	const planeFront = makePlaneModel({ edgeVertCount, hue: 240, vOffset: vCount*4 });
	const planeBack = makePlaneModel({ edgeVertCount, hue: 300, vOffset: vCount*5 });
	
	planeBottom.vertices.forEach(v => {
		v.x *= -1;
		v.y = 1;
	});
	planeLeft.vertices.forEach(v => {
		v.y = -v.x;
		v.x = -1;		
	});
	planeRight.vertices.forEach(v => {
		v.y = v.x;
		v.x = 1;		
	});
	planeFront.vertices.forEach(v => {
		v.y = v.z;
		v.z = 1;		
	});
	planeBack.vertices.forEach(v => {
		v.y = -v.z;
		v.z = -1;
	});
	
	return {
		vertices: [
			...planeTop.vertices,
			...planeBottom.vertices,
			...planeLeft.vertices,
			...planeRight.vertices,
			...planeFront.vertices,
			...planeBack.vertices
		],
		polys: [
			...planeTop.polys,
			...planeBottom.polys,
			...planeLeft.polys,
			...planeRight.polys,
			...planeFront.polys,
			...planeBack.polys
		]
	};
}


class Entity {
	constructor({ model, x=0, y=0, z=0, rotateX=0, rotateY=0, rotateZ=0 }) {
		const vertices = cloneVertices(model.vertices);
		
		const polys = model.polys.map(p => ({
			vertices: p.vIndexes.map(vIndex => vertices[vIndex]),
			color: p.color,
			depth: 0,
			middle: { x: 0, y: 0, z: 0 },
			normalWorld: { x: 0, y: 0, z: 0 },
			normalCamera: { x: 0, y: 0, z: 0 }
		}));
		
		this.model = model;
		this.x = x;
		this.y = y;
		this.z = z;
		this.rotateX = rotateX;
		this.rotateY = rotateY;
		this.rotateZ = rotateZ;
		this.vertices = vertices;
		this.polys = polys;
	}
	
	transform() {
		transformVertices(
			this.model.vertices,
			this.vertices,
			this.x,
			this.y,
			this.z,
			this.rotateX,
			this.rotateY,
			this.rotateZ
		);
	}
}


const baseCubeModel = makeCubeModel(verticesPerEdge);
const flowerBoxModel = makeCubeModel(verticesPerEdge);

const flowerBox = new Entity({ model: flowerBoxModel });
const allVertices = flowerBox.vertices;
const allPolys = flowerBox.polys;


function applyFlowerBoxScale(scale) {
	baseCubeModel.vertices.forEach((v, i) => {
		const target = flowerBoxModel.vertices[i];
		const weight = weightFn(v.distance);
		target.x = lerp(v.x, v.x * scale, weight);
		target.y = lerp(v.y, v.y * scale, weight);
		target.z = lerp(v.z, v.z * scale, weight);
	});
}


// Apply translation/rotation to all vertices in scene.
function transformVertices(vertices, target, tX, tY, tZ, rX, rY, rZ) {
	// Matrix multiplcation constants only need calculated once for all vertices.
	const sinX = Math.sin(rX);
	const cosX = Math.cos(rX);
	const sinY = Math.sin(rY);
	const cosY = Math.cos(rY);
	const sinZ = Math.sin(rZ);
	const cosZ = Math.cos(rZ);
	
	// Using forEach() like map(), but with a (recycled) target array.
	vertices.forEach((v, i) => {
		const targetVertex = target[i];
		// X axis rotation
		const x1 = v.x;
		const y1 = v.z*sinX + v.y*cosX;
		const z1 = v.z*cosX - v.y*sinX;
		// Y axis rotation
		const x2 = x1*cosY - z1*sinY;
		const y2 = y1;
		const z2 = x1*sinY + z1*cosY;
		// Z axis rotation
		const x3 = x2*cosZ - y2*sinZ;
		const y3 = x2*sinZ + y2*cosZ;
		const z3 = z2;
		
		// Translate and set the transform.
		targetVertex.x = x3 + tX;
		targetVertex.y = y3 + tY;
		targetVertex.z = z3 + tZ;
	});
}

// Apply perspective projection to all vertices in scene.
function projectScene() {
	const focalLength = cameraDistance * sceneScale;
	allVertices.forEach((v, i) => {
		const depth = focalLength / (cameraDistance - v.z);
		v.x = v.x * depth;
		v.y = v.y * depth;
	});
}


// Main loop (rAF)
stage.onTick = function tick({ simTime, simSpeed, width, height }) {
	const tickStartTime = performance.now();
	
	// Flowerbox animation
	// ----------------------------------------
	if (animate) {
		runtime += simTime;
		const animationPosition = (runtime / flowerBoxDuration) % 1;
		const scale = lerp(flowerBoxScaleMax, flowerBoxScaleMin, easeInOut(yoyo(animationPosition)));
		applyFlowerBoxScale(scale);
	}
	
	// Rotation
	// ----------------------------------------
	
	// Only auto-rotate if user is not interacting.
	if (!pointerIsDown) {
		rotationAutoY += 0.005 * simSpeed;
		rotationAutoZ += 0.005 * simSpeed;
	}
	
	rotationFinalY = rotationAutoY + pointerDelta.x;
	rotationFinalZ = rotationAutoZ + pointerDelta.y;
	
	flowerBox.rotateX = rotationFinalZ;
	flowerBox.rotateY = -rotationFinalY;
	flowerBox.transform();
	
	// Scene Calculations & Transformations
	// ----------------------------------------
	allPolys.forEach(p => computePolyNormal(p, 'normalWorld'));
	transformVertices(allVertices, allVertices, 0, 0, 0, 0.75, 0, 0, 1, 1, 1);
	allPolys.forEach(computePolyDepth);
	allPolys.sort((a, b) => b.depth - a.depth);
	projectScene();
	allPolys.forEach(p => computePolyNormal(p, 'normalCamera'));
	
	updateTickTime(performance.now() - tickStartTime);
};

// Draw loop
let renderedPolyCount = 0;
stage.onDraw = function draw({ ctx, width, height }) {
	const renderStartTime = performance.now();
	
	const scale = Math.min(width, height) / 4;
	const centerX = width / 2;
	const centerY = height / 2;
	
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, width, height);
	
	// Center coordinate system
	ctx.save();
	ctx.translate(centerX, centerY);
	ctx.scale(scale, scale);

	// ctx.strokeStyle = '#09f';
	// ctx.lineJoin = 'round';
	// ctx.lineWidth = 1 / scale;
	
	renderedPolyCount = 0;
	allPolys.forEach(p => {
		if (p.normalCamera.z < 0) return;
		
		renderedPolyCount++;
		if (drawNormalColors) {
			const g = (p.normalWorld.x + 1) / 2 * 255 | 0;
			const r = (p.normalWorld.y + 1) / 2 * 255 | 0;
			const b = (p.normalWorld.z + 1) / 2 * 255 | 0;
			ctx.fillStyle = `rgb(${r},${g},${b})`;
		} else {
			const normalLight = p.normalWorld.y;
			const lightness = normalLight > 0
				? 10
				: ((normalLight ** 32 - normalLight) / 2) * 90 + 10;

			ctx.fillStyle = `hsl(${p.color.h},${p.color.s}%,${lightness}%)`;
		}
		const { vertices } = p;
		ctx.beginPath();
		const lastV = vertices[vertices.length - 1];
		ctx.moveTo(lastV.x, lastV.y);
		for (let v of vertices) {
			ctx.lineTo(v.x, v.y);
		}
		ctx.fill();
		// ctx.stroke();
	});
	
	if (drawNormalLines) {
		ctx.strokeStyle = '#f90';
		ctx.lineWidth = 0.5 / scale;
		ctx.beginPath();
		ctx.globalAlpha = 0.5;
		allPolys.forEach(p => {
			if (p.normalCamera.z >= 0) return;
			computePolyMiddle(p);
			ctx.moveTo(p.middle.x, p.middle.y);
			ctx.lineTo(p.middle.x + 0.12*p.normalCamera.x, p.middle.y + 0.12*p.normalCamera.y);
		});
		ctx.stroke();
		ctx.globalAlpha = 1;
		ctx.beginPath();
		allPolys.forEach(p => {
			if (p.normalCamera.z < 0) return;
			computePolyMiddle(p);
			ctx.moveTo(p.middle.x, p.middle.y);
			ctx.lineTo(p.middle.x + 0.12*p.normalCamera.x, p.middle.y + 0.12*p.normalCamera.y);
		});
		ctx.stroke();
	}
	
	ctx.restore();
	
	updateRenderTime(performance.now() - renderStartTime);
}	

// Simple render time display with a moving average.
const renderTimeNode = document.createElement('div');
renderTimeNode.classList.add('render-time');
document.body.appendChild(renderTimeNode);
const tickTimeLog = [];
const renderTimeLog = [];
function updateTickTime(timeMs) {
	tickTimeLog.push(timeMs);
}
function updateRenderTime(timeMs) {
	renderTimeLog.push(timeMs);
	if (renderTimeLog.length > 30) {
		const tickTime = tickTimeLog.reduce((a, b) => a + b) / tickTimeLog.length;
		const renderTime = renderTimeLog.reduce((a, b) => a + b) / renderTimeLog.length;
		renderTimeNode.innerHTML = `Polys: ${allPolys.length} (${renderedPolyCount})<br>Tick:  ${tickTime.toFixed(2)}ms<br>Draw:  ${renderTime.toFixed(2)}ms<br>Total: ${(tickTime + renderTime).toFixed(2)}ms`;
		tickTimeLog.length = 0;
		renderTimeLog.length = 0;
	}
}


// Interaction
// -----------------------------

// Allow pausing animation
const animationToggleBtn = document.querySelector('.animation-toggle');
function updateAnimationToggleBtn() {
	animationToggleBtn.textContent = animate ? 'PAUSE' : 'PLAY';
}
updateAnimationToggleBtn();
animationToggleBtn.addEventListener('click', () => {
	animate = !animate;
	updateAnimationToggleBtn();
});

// Allow toggling normal rendering
const normalToggleBtn = document.querySelector('.normal-toggle');
function updateNormalToggleBtn() {
	let state = '';
	if (!drawNormalLines && !drawNormalColors) {
		state = 'NONE';
	} else if (drawNormalLines && drawNormalColors) {
		state = 'LINES';
	} else if (drawNormalColors) {
		state = 'COLORS';
	}
	normalToggleBtn.innerHTML = `NORMALS:<br>${state}`;
}
updateNormalToggleBtn();
normalToggleBtn.addEventListener('click', () => {
	if (!drawNormalLines && !drawNormalColors) {
		drawNormalColors = true;
	} else if (drawNormalLines && drawNormalColors) {
		drawNormalLines = false;
		drawNormalColors = false;
	} else if (drawNormalColors) {
		drawNormalLines = true;
	}
	updateNormalToggleBtn();
});

// Interaction state
let pointerIsDown = false;
let pointerStart = { x: 0, y: 0 };
let pointerDelta = { x: 0, y: 0 };

function handlePointerDown(x, y) {
	if (!pointerIsDown) {
		pointerIsDown = true;
		pointerStart.x = x;
		pointerStart.y = y;
	}
}

function handlePointerUp() {
	pointerIsDown = false;
	// Apply rotation
	rotationAutoY += pointerDelta.x;
	rotationAutoZ += pointerDelta.y;
	// Reset delta
	pointerDelta.x = 0;
	pointerDelta.y = 0;
}

function handlePointerMove(x, y) {
	if (pointerIsDown) {
		const maxRotationX = Math.PI * 1.2;
		const maxRotationY = Math.PI * 1.2;
		pointerDelta.x = (x - pointerStart.x) / stage.width * maxRotationX;
		pointerDelta.y = (y - pointerStart.y) / stage.height * maxRotationY;
	}
}


// Use pointer events if available, otherwise fallback to touch events (for iOS).
if ('PointerEvent' in window) {
	stage.canvas.addEventListener('pointerdown', event => {
		event.isPrimary && handlePointerDown(event.clientX, event.clientY);
	});

	stage.canvas.addEventListener('pointerup', event => {
		event.isPrimary && handlePointerUp();
	});

	stage.canvas.addEventListener('pointermove', event => {
		event.isPrimary && handlePointerMove(event.clientX, event.clientY);
	});
} else {
	let activeTouchId = null;
	stage.canvas.addEventListener('touchstart', event => {
		if (!pointerIsDown) {
			const touch = event.changedTouches[0];
			activeTouchId = touch.identifier;
			handlePointerDown(touch.clientX, touch.clientY);
		}
	});
	stage.canvas.addEventListener('touchend', event => {
		for (let touch of event.changedTouches) {
			if (touch.identifier === activeTouchId) {
				handlePointerUp();
				break;
			}
		}
	});
	stage.canvas.addEventListener('touchmove', event => {
		for (let touch of event.changedTouches) {
			if (touch.identifier === activeTouchId) {
				handlePointerMove(touch.clientX, touch.clientY);
				event.preventDefault();
				break;
			}
		}
	}, { passive: false });
}