$(document).ready(function() {
			var canvas = document.getElementById('forest');
			if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
					recursiveTree(ctx, 800, 485, 80, -Math.PI / 2, 13, 13);
				}
			});

var recursiveTree = function (ctx, startX, startY, length, angle, depth, branchWidth ) {
	var rand = Math.random,
		newLength, newAngle, newDepth, maxBranch = 3,
		endX, endY, maxAngle = 2 * Math.PI / 4,
		subBranches;
	
	ctx.beginPath();
	ctx.moveTo(startX,startY);
	endX = startX + length * Math.cos(angle);
	endY = startY + length * Math.sin(angle);
	ctx.lineCap = 'round';
	ctx.lineWidth = branchWidth;
	ctx.lineTo(endX,endY);
	
	if (depth <= 2) {
		ctx.strokeStyle = "#27ae60";
	}
	else {
		ctx.strokeStyle = "#2c3e50";
	}
	ctx.stroke();
	
	newDepth = depth - 1;
	
	if (!newDepth) {
		return;
	}
	
	subBranches = (rand() * (maxBranch - 1)) + 1;
	
	branchWidth *= 0.7;
	
	for ( var i = 0; i < subBranches; i++ ) {
		newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
		newLength = length * (0.7 + rand() * 0.3);
		recursiveTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);
	}
};