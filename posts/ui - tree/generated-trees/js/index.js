var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	height = canvas.height = 400,
	width = canvas.width = document.body.offsetWidth;

function Tree(ctx,x,y) {
	this.ctx = ctx;
	this.sleep = 4;
	this.loss = .1; // branch width loss
	this.speed = .3; // runner distance speed
  this.limit = Math.random() * 3000 + 10000; // limit the number of new generations (before I stop);
  this.i = 0;
	this.develop(10,0,x,y,0,-Math.random()*3);// start the generation
}
Tree.prototype = {
	constructor: Tree,
	// width, life, x, y, deviationx, devationy
	develop: function(w,l,x,y,dx,dy) {
		this.ctx.beginPath();
		this.ctx.moveTo(x,y); // goto start
		x+=dx; //set up new position
		y+=dy;
		dx+=Math.sin(Math.random()+l)*this.speed;
		dy+=Math.cos(Math.random()+l + (l/2))*this.speed;
		// if width is large enough we are a trunk/branch
		if( w-l*this.loss > .5 ) {
			this.ctx.lineWidth = w-l*this.loss;
			this.ctx.strokeStyle = 'rgba(77, 62, 58, 1.0)';
		} else { // otherwise a leaf
			this.ctx.lineWidth = (w-l*this.loss)*4;
			this.ctx.strokeStyle = 'rgba(24, ' + (Math.random() * 60 + 68 | 0) + ', 62, .3)';
		}
		// draw line
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
		this.ctx.closePath();
		if( this.i++ > this.limit ) {
			return;
		}
		// if we've been generating a while start drawing leafs.
		if( l > 5 * w + Math.random() * 100 && Math.random()>.5) {
			var that = this;
			setTimeout(function() {
				that.develop(w,++l,x,y,2*Math.sin(Math.random()+l),2*Math.cos(Math.random()+l));
			}, this.sleep);
		}
		// draw branches (or leafs, depending on size).. yes both draw leafs. i said it was cheap.
		if( w-l*this.loss >= -1.5 ) {
			var that = this;
			setTimeout(function() {
				that.develop(w,++l,x,y,dx,dy);
			}, this.sleep);
		}

	}
};
// this entire thing is terribly expensive on your cpu and is a horrible understanding of http://urbanoalvarez.es/blog/2013/01/14/procedurally-generated-trees-in-javascript/
for( var i = 0; i < 20; i++ ) {
	new Tree(context, Math.random()*width, height);
}