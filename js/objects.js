//Stores all Instances that rely on tick handling

function tickHandlerClass() {
	var obj = {};
	
	obj.targets = [];
	obj.register = function(target) {
		obj.targets.push(target);
	}
	
	obj.unregister = function(target) {
		var i = obj.targets.indexOf(target);
		obj.targets.splice(i, 1);
	}
	
	obj.tick = function() {
		var tar = obj.targets;
		tar.sort(function(a, b){
			return a.priority - b.priority
		});
		tar.forEach(function(x) {
			x.tick();
		});
	}
	
	return obj;
}

var tickHandler = tickHandlerClass();


function rectangleParticle(color, x, y, spread, width) {
	var obj = {};
	
	if (!width) {
		width = 0.01;
	}
	
	obj.priority = 500;
	
	obj.x = x;
	obj.lifetime = 40 + (Math.random() * 30);
	obj.maxlifetime = obj.lifetime;
	obj.y = y;
	obj.color = color;
	obj.rotation = Math.random() * 360;
	obj.rotspeed = 0.4 * Math.random() + 0.3;
	
	obj.startWidth = width * canvasWidth + (Math.random() * width * canvasWidth);
	obj.width = obj.startWidth;
	obj.height = obj.width;
	
	if (Math.random() > 0.5) { obj.rotspeed = -obj.rotspeed; }
	
	obj.speed = 0.05;
	obj.vx = obj.speed + (Math.random() * obj.speed);
	obj.vy = obj.speed + (Math.random() * obj.speed);
	
	if (Math.random() > 0.5) { obj.vx = -obj.vx; }
	if (Math.random() > 0.5) { obj.vy = -obj.vy; }
	
	tickHandler.register(obj);
	
	if (typeof spread == "undefined" || spread == null) {
		spread = 0;
	}
	
	if (Math.random() > 0.5) { x += Math.random() * spread; } else { obj.x -= Math.random() * spread; }
	if (Math.random() > 0.5) { y += Math.random() * spread; } else { obj.y -= Math.random() * spread; }
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
	}
	
	obj.tick = function() {
		obj.x += obj.vx;
		obj.y += obj.vy;
		
		obj.rotation = (obj.rotation + obj.rotspeed) % 360;
		
		obj.lifetime--;
		obj.width = obj.lifetime/obj.maxlifetime * obj.startWidth;
		obj.height = obj.lifetime/obj.maxlifetime * obj.startWidth;
		
		if (obj.lifetime < 0) {
			obj.destroy();
			return;
		}
		
		ctx.save();
		ctx.beginPath();
		
		ctx.fillStyle = obj.color;
		
		var alpha = obj.lifetime/obj.maxlifetime * 0.8;
		if (alpha < 0) { alpha = 0; }
		ctx.globalAlpha = alpha;
		
		ctx.translate(obj.x + (obj.width / 2), obj.y + (obj.height / 2));
		ctx.rotate(obj.rotation*Math.PI/180);
		
		ctx.rect(-obj.width/2, -obj.height/2, obj.width, obj.height);
		ctx.fill();
		
		ctx.restore();
	}
	
	return obj;
}

function playerBall() {
	var obj = {};
	
	obj.priority = 1000;
	obj.cooldown = -1;
	
	obj.state = 0;
	obj.color = mainColors[obj.state];
	
	obj.x = 0;
	obj.y = 0;
	
	obj.radius = 30;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
	}
	
	obj.tick = function() {
		obj.cooldown--;
		
		var col = obj.color;
		if (obj.cooldown > 0) {
			col = mainColors[mainColors.length-1];
		}
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		if (true || tick % 2 == 0) {
			rectangleParticle(col, obj.x, obj.y, 30);
		}
		
		enemies.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.color == obj.color) {
					gameOver();
				} else {
					e.destroy();
				}
			}
		});
	}
	
	obj.switchState = function() {
		if (obj.cooldown > 0) {
			return;
		}
		
		obj.cooldown = 1.5 * tickSpeed;
		
		if (obj.state == 0) {
			obj.state = 1;
		} else {
			obj.state = 0;
		}
		
		obj.color = mainColors[obj.state];
		console.log("Switch");
		console.log(obj.color);
	}
	
	obj.updatePosition = function(e) {
		obj.x = e.pageX;
		obj.y = e.pageY;
	}
	
	return obj;
}

function enemyBall() {
	var obj = {};
	
	obj.priority = 700;
	obj.speed = 1;
	
	obj.state = Number(randomBool());
	obj.color = mainColors[obj.state];
	
	obj.x = random(Math.random() * -100, canvasWidth + (100 * Math.random()));
	obj.y = random(Math.random() * -100, canvasHeight + (100 * Math.random()));
	
	obj.radius = 12;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
	}
	
	obj.tick = function() {
		obj.move();
		
		var col = obj.color;
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		if (tick % 2 == 0) {
			rectangleParticle(col, obj.x, obj.y, 5, 0.004);
		}
	}
	
	obj.move = function() {
		var dx = player.x - obj.x;
		var dy = player.y - obj.y;
		 
		var xdist = Math.abs(dx);
		var ydist = Math.abs(dy);
		
		var ratio = obj.speed / Math.sqrt(xdist * xdist + ydist * ydist);
		
		obj.x += ratio * dx;
		obj.y += ratio * dy;
	}
	
	return obj;
}

function waveSpawner() {
	var obj = {};
	
	tickHandler.register(obj);
	obj.tick = function() {
		if (tick == tickSpeed) {
			repeat(3, function() {
				enemies.push(enemyBall());
				console.log("Spawned!");
			});
		}
		
		if (tick == 5 * tickSpeed) {
			repeat(2, function() {
				enemies.push(enemyBall());
			});
		}
		
		if (tick == 12 * tickSpeed) {
			repeat(3, function() {
				enemies.push(enemyBall());
			});
		}
	}
	
	return obj;
}

function circularCollisionMask(radius, holder) {
	var obj = {};
	obj.radius = radius;
	obj.holder = holder;
	
	obj.type = "circle";
	
	obj.collides = function(mask) {
		if (mask.type == "circle") {
			var dx = Math.abs(obj.holder.x - mask.holder.x);
			var dy = Math.abs(obj.holder.y - mask.holder.y);
			
			var distance = Math.sqrt(dx * dx + dy * dy);
			
			return (distance < (obj.radius + mask.radius));
		}
		
		console.error("Unknown type of collision mask: " + mask.type);
		return false;
	}
	
	return obj;
}


