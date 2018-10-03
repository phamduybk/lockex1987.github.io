

////////////////////////////////////////////
////////////   VERLET RAG DOLL   ///////////
////////////////////////////////////////////



///---INITIATION---///

window.onload = function() {

	//canvas variables
	var container = document.getElementById("container_div");
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//rag doll variables
	var points = [];
	var spans = [];
	var skins = [];
	var pointCount = 0;
  var rigidity = 15;  // (iterations of position-accuracy refinement)
	var gravity = .25;  // (rate of y-velocity increase per frame)
	var friction = 0.999;  // (proportion of previous velocity after frame refresh)
	var bounceLoss = 0.9;  // (proportion of previous velocity after bouncing)
  var skidLoss = 0.8;  // (proportion of previous velocity if touching the ground)
  
	//scaling
	scaleToWindow();
  var canvasPositionLeft = canvas.getBoundingClientRect().left + window.scrollX;
  var canvasPositionTop = canvas.getBoundingClientRect().top + window.scrollY;
  
  //interaction
  var mouseCanvasX;
  var mouseCanvasY;
  var grabbedPointId = null;


  
	///---OBJECTS---///

	//point constructor
	function Point(current_x, current_y, materiality="material") {
	  this.cx = current_x;
	  this.cy = current_y; 
	  this.px = this.cx;  // previous x value
	  this.py = this.cy;  // previous y value
    this.materiality = materiality;
    this.grabbed = false;
	  this.id = pointCount;
	  pointCount += 1;
	}

	//span constructor
	function Span(point_1, point_2, visibility="visible") {
		this.p1 = point_1;
		this.p2 = point_2;
		this.l = distance(this.p1,this.p2) // length
		this.visibility = visibility;
	}
  
  //skins constructor
  function Skin(points_array,color) {
    this.pa = points_array;  //an array of points for skin outline path
    this.c = color;
  }

	//points  
	// (head)
  addPt(48,1); addPt(52,1);  //id 0,1
  addPt(48,6); addPt(52,6);  //id 2,3 
  // (neck base)
  addPt(50,8);  // id 4
  // (torso)
  addPt(44,8); addPt(56,8);  //id 5,6
  addPt(47,20); addPt(53,20);  //id 7,8
  // (arms)
  addPt(37,13); addPt(42,12); addPt(32,20); addPt(37,16);  //id 9,10,11,12
  addPt(63,13); addPt(58,12); addPt(68,20); addPt(63,16);  //id 13,14,15,16
  // (legs)
  addPt(45,33); addPt(49,26); addPt(46,44); addPt(47.5,36);  //id 17,18,19,20
  addPt(55,33); addPt(51,26); addPt(54,44); addPt(52.5,36);  //id 21,22,23,24
  // (forearm bindings)
  addPt(39,14,"immaterial"); addPt(61,14,"immaterial");  //id 25 26
  // (lower leg bindings)
  addPt(48,32,"immaterial"); addPt(52,32,"immaterial");  //id 27 28
  // (arm bindings & scaffolding)
  addPt(37,8,"immaterial"); addPt(31,11,"immaterial");  //id 29,30
  addPt(63,8,"immaterial"); addPt(69,11,"immaterial");  //id 31,32
  addPt(39,18,"immaterial"); addPt(37,19,"immaterial");  //id 33,34
  addPt(61,18,"immaterial"); addPt(63,19,"immaterial");  //id 35,36
  // (leg bindings & scaffolding)
  addPt(49,35,"immaterial"); addPt(48,39,"immaterial");  //id 37,38 
  addPt(51,35,"immaterial"); addPt(52,39,"immaterial");  //id 39,40
  addPt(41,24,"immaterial"); addPt(37,28,"immaterial");  //id 41,42 
  addPt(59,24,"immaterial"); addPt(63,28,"immaterial");  //id 43,44
  addPt(50,31,"immaterial");  //id 45
  
	//spans
  // (head)
  addSp(0,1); addSp(0,2); addSp(1,3); 
  addSp(0,3,"hidden"); addSp(1,2,"hidden"); addSp(2,3,"hidden");
  // (head scaffolding)
  addSp(0,6,"hidden"); addSp(0,5,"hidden"); addSp(0,8,"hidden"); addSp(1,5,"hidden");
  addSp(1,6,"hidden"); addSp(1,7,"hidden"); addSp(2,5,"hidden"); addSp(3,6,"hidden"); 
  addSp(5,8,"hidden"); addSp(6,7,"hidden");
  // (neck)
  addSp(0,4,"hidden"); addSp(1,4,"hidden"); 
  // (shoulders)
  addSp(2,6); addSp(3,5); 
  // (torso)
  addSp(5,4,"hidden"); addSp(5,6,"hidden"); addSp(5,7); addSp(4,6,"hidden"); 
  addSp(4,7,"hidden"); addSp(4,8,"hidden"); addSp(6,8); addSp(7,8); 
  // (arms)
  addSp(5,9); addSp(5,10); addSp(9,10); addSp(9,11); addSp(9,12); addSp(11,12); 
  addSp(6,13); addSp(6,14); addSp(13,14); addSp(13,15); addSp(13,16); addSp(15,16); 
  // (legs)
  addSp(7,17); addSp(7,18); addSp(17,18); addSp(17,19); addSp(17,20); addSp(19,20); 
  addSp(8,21); addSp(8,22); addSp(21,22); addSp(21,23); addSp(21,24); addSp(23,24); 
  // (forearm bindings)
  addSp(25,10,"hidden"); addSp(25,12,"hidden"); addSp(26,14,"hidden"); addSp(26,16,"hidden");
  // (lower leg binding)
  addSp(27,18,"hidden"); addSp(27,20,"hidden"); addSp(28,22,"hidden"); addSp(28,24,"hidden");
  // (arm bindings & scaffolding)
  addSp(29,5,"hidden"); addSp(29,7,"hidden"); addSp(29,30,"hidden"); addSp(30,9,"hidden");
  addSp(31,6,"hidden"); addSp(31,8,"hidden"); addSp(31,32,"hidden"); addSp(32,13,"hidden");
  addSp(33,5,"hidden"); addSp(33,9,"hidden"); addSp(33,34,"hidden"); addSp(34,11,"hidden");
  addSp(35,6,"hidden"); addSp(35,13,"hidden"); addSp(35,36,"hidden"); addSp(36,15,"hidden");  
  // (leg bindings and scaffolding)
  addSp(37,7,"hidden"); addSp(37,17,"hidden"); addSp(37,38,"hidden"); addSp(38,19,"hidden");
  addSp(39,8,"hidden"); addSp(39,21,"hidden"); addSp(39,40,"hidden"); addSp(40,23,"hidden");
  addSp(41,5,"hidden"); addSp(41,7,"hidden"); addSp(41,42,"hidden"); addSp(42,17,"hidden");
  addSp(43,6,"hidden"); addSp(43,8,"hidden"); addSp(43,44,"hidden"); addSp(44,21,"hidden");
  addSp(45,18,"hidden"); addSp(45,22,"hidden");
  
  //skins
  // (head & torso)
  addSk([0,1,3,5,7,8,6,2,0],"pink");
  // (legs)
  addSk([7,17,19,20,17,18,7],"pink"); addSk([8,22,21,24,23,21,8],"pink");
  // (arms)
  addSk([5,9,11,12,9,10,5],"pink"); addSk([6,13,15,16,13,14,6],"pink");
  
  // adds a little initial random velocity
  points[5].px = points[5].cx+randNumBetween(-50,50);
  points[8].px = points[8].cx+randNumBetween(-50,50);
  points[6].py = points[6].cy+randNumBetween(-50,50);
  points[7].py = points[7].cy+randNumBetween(-50,50);
  
	//updates frame
	update();



	///---FUNCTIONS---///

	//scaling
	function scaleToWindow() {
	  if (window.innerWidth > window.innerHeight) {
	    container.style.height = window.innerHeight*0.8+"px";
	    container.style.width = container.style.height;
	  } else {
	    container.style.width = window.innerWidth*0.8+"px";
	    container.style.height = container.style.width;
	  }
	  canvas.width = document.getElementById("canvas_div").clientWidth;
	  canvas.height = document.getElementById("canvas_div").clientHeight;
	}
  
  //converts percentage to canvas x value
  function xPct(pct) {
    return pct * canvas.width / 100;
  }
  
  //converts percentage to canvas y value
  function yPct(pct) {
    return pct * canvas.height / 100;
  }
  
  //gets a point by id number
	function getPt(id) {
  	for (var i=0; i<points.length; i++) { 
    	if (points[i].id == id) { return points[i]; }
		}
	}
  
	//gets distance between two points (pythogorian theorum)
	function distance(point_1, point_2) {
		var x_difference = point_2.cx - point_1.cx;
		var	y_difference = point_2.cy - point_1.cy;
		return Math.sqrt( x_difference*x_difference + y_difference*y_difference);
	}
  
  //generates random number between a minimum and maximum value
	function randNumBetween(min,max) {
	  return Math.floor(Math.random()*(max-min+1))+min;
	}

  //creates a point object instance
  function addPt(xp,yp,materiality="material") {
    points.push( new Point( xPct(xp), yPct(yp), materiality ) );
  }
  
  //creates a span object instance
  function addSp(p1,p2,visibility="visible") {
    spans.push( new Span( getPt(p1), getPt(p2), visibility ) );
  }

  //creates a skin object instance
  function addSk(id_path_array, color) {
    var points_array = [];
    for ( var i=0; i<id_path_array.length; i++) {
      points_array.push(points[id_path_array[i]]);
    }
    skins.push( new Skin(points_array,color) );
  }
  
  //tethers grabbed point to mouse
  function followMouseifGrabbed() {
    if (grabbedPointId) {
      points[grabbedPointId].px = points[grabbedPointId].cx = mouseCanvasX; 
      points[grabbedPointId].py = points[grabbedPointId].cy = mouseCanvasY;
    }
  }
  
	//updates coordinates and renders new frames continuously
	function update() {
	  updatePoints();
	  //(refines point positions for position accuracy & shape rigidity)
	  for (var i=0; i<rigidity; i++) {
	  	bounce();
	  	updateSpans();
		}
    clearCanvas();  //clears previous frame
		//renderSpans();  //displays spans
    //renderHiddenSpans(); // displays hidden scaffoling & binding spans
    renderSkins();  // displays skins
	  window.requestAnimationFrame(update);
	}

	// updates points based on verlet velocity (i.e., current coord minus previous coord)
	function updatePoints() {
		for(var i=0; i<points.length; i++) {
			var p = points[i];  // point object
			var	xv = (p.cx - p.px) * friction;	// x velocity
			var	yv = (p.cy - p.py) * friction;	// y velocity
      if (p.py >= canvas.height-1 && p.py <= canvas.height) { xv *= skidLoss };
			p.px = p.cx;  // updates previous x as current x
			p.py = p.cy;  // updates previous y as current y
			p.cx += xv;  // updates current x with new velocity
			p.cy += yv;  // updates current y with new velocity
			p.cy += gravity;  // add gravity to y
		}	
    followMouseifGrabbed();
	}

	// inverts velocity for bounce if a point reaches a wall
	function bounce() {
		for (var i=0; i<points.length; i++) {
			var p = points[i];
      if (p.materiality == "material") {
        if (p.cx > canvas.width) {
          p.cx = canvas.width;
          p.px = p.cx + (p.cx - p.px) * bounceLoss;
        }
        if (p.cx < 0) {
          p.cx = 0;
          p.px = p.cx + (p.cx - p.px) * bounceLoss;
        }
        if (p.cy > canvas.height) {
          p.cy = canvas.height;
          p.py = p.cy + (p.cy - p.py) * bounceLoss;
        }
        if (p.cy < 0) {
          p.cy = 0;
          p.py = p.cy + (p.cy - p.py) * bounceLoss;
        }
      }
		}
	}

	// sets spans between points
	function updateSpans() {
		for (var i=0; i<spans.length; i++) {
			var s = spans[i];
			var dx = s.p2.cx - s.p1.cx;  // distance between x values
			var	dy = s.p2.cy - s.p1.cy;  // distance between y values
			var d = Math.sqrt( dx*dx + dy*dy);  // distance between the points
			var	r = s.l / d;	// ratio (span length over distance between points)
			var	mx = s.p1.cx + dx / 2;  // midpoint between x values 
			var my = s.p1.cy + dy / 2;  // midpoint between y values
			var ox = dx / 2 * r;  // offset of each x value (compared to span length)
			var oy = dy / 2 * r;  // offset of each y value (compared to span length)
			s.p1.cx = mx - ox;  // updates span's first point x value
			s.p1.cy = my - oy;  // updates span's first point y value
			s.p2.cx = mx + ox;  // updates span's second point x value
			s.p2.cy = my + oy;  // updates span's second point y value
		}
	}
  
  // clears canvas frame
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

	// displays spans
	function renderSpans() {
		ctx.beginPath();
		for (var i=0; i<spans.length; i++) {
			var s = spans[i];
			if (s.visibility == "visible") {
        ctx.strokeStyle="black";
				ctx.moveTo(s.p1.cx, s.p1.cy);
				ctx.lineTo(s.p2.cx, s.p2.cy);
			}
		}
		ctx.stroke(); 
 	}
  
  //display scaffolding & binding spans
	function renderHiddenSpans() {
		ctx.beginPath();
		for (var i=0; i<spans.length; i++) {
			var s = spans[i];
			if (s.visibility == "hidden") {
		ctx.strokeStyle="pink";
				ctx.moveTo(s.p1.cx, s.p1.cy);
				ctx.lineTo(s.p2.cx, s.p2.cy);
			}
		}
		ctx.stroke();
 	}
  
  // displays skins 
  function renderSkins() {
    for(var i=0; i<skins.length; i++) {
			var s = skins[i];
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = (canvas.width*.002).toString();
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.fillStyle = s.c;
			ctx.moveTo(s.pa[0].cx, s.pa[0].cy);
			for(var j=1; j<s.pa.length; j++) {
				ctx.lineTo(s.pa[j].cx, s.pa[j].cy);
			}
			ctx.stroke();
			ctx.fill();  
		}
  }
  
  //grabs doll on click
  function grabDoll(e) {
    mouseCanvasX = e.pageX - canvasPositionLeft;  //mouse canvas x
    mouseCanvasY = e.pageY - canvasPositionTop;  //mouse canvas y
    var nearestPointDist = canvas.width;
    var nearestPoint;
    // (finds point nearest to click) 
    for (var i=0; i<points.length; i++) {
      var x_diff = points[i].cx - mouseCanvasX;
      var	y_diff = points[i].cy - mouseCanvasY;
      var dist = Math.sqrt( x_diff*x_diff + y_diff*y_diff);
      if (dist < nearestPointDist && points[i].materiality == "material") {
        nearestPointDist = dist; 
        nearestPoint = points[i]; 
      };
    };    
    // (if point is near click, i.e. less than pelvis width, grab it)
    if (nearestPointDist < distance(points[7], points[8])) {
      grabbedPointId = nearestPoint.id;
    }    
  }

  //moves doll
  function moveDoll(e) {
    mouseCanvasX = e.pageX - canvasPositionLeft;  //mouse canvas x
    mouseCanvasY = e.pageY - canvasPositionTop;  //mouse canvas y
    // (drops doll if mouse leaves canvas)
    if (   mouseCanvasX < 0
        || mouseCanvasX > canvas.width 
        || mouseCanvasY < 0 
        || mouseCanvasY > canvas.height) { 
      grabbedPointId = null 
    }; 
    followMouseifGrabbed();
  }

  //drops doll
  function dropDoll(e) {
    grabbedPointId = null;
  }



	///---EVENTS---///

	//scaling
	window.addEventListener('resize', scaleToWindow);
  
  //interaction
  document.addEventListener("mousedown", grabDoll);
  document.addEventListener("mousemove", moveDoll);
  document.addEventListener("mouseup", dropDoll);

  document.addEventListener("touchstart", grabDoll);
  document.addEventListener("touchmove", moveDoll);
  document.addEventListener("touchend", dropDoll);
  
};