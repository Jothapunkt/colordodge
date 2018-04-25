function rectangleParticle(color, x, y, spread, width) {
	var obj = {};
	
	obj.name = "RectangleParticle";
	
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
	
	if (Math.random() > 0.5) { obj.x += Math.random() * spread; } else { obj.x -= Math.random() * spread; }
	if (Math.random() > 0.5) { obj.y += Math.random() * spread; } else { obj.y -= Math.random() * spread; }
	
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

function destructionParticle(color, x, y, spread, width) {
	var obj = {};
	
	obj.name = "DestructionParticle";
	
	if (!width) {
		width = 0.01;
	}
	
	obj.priority = 500;
	
	obj.x = x;
	obj.startX = x;
	obj.lifetime = 40 + (Math.random() * 30);
	obj.maxlifetime = obj.lifetime;
	obj.y = y;
	obj.startY = y;
	obj.color = color;
	obj.rotation = Math.random() * 360;
	
	obj.startWidth = width * canvasWidth + (Math.random() * width * canvasWidth);
	obj.width = obj.startWidth;
	obj.height = obj.width;
	
	obj.speed = 0.1 + (Math.random() * 1.2);
	
	tickHandler.register(obj);
	
	if (typeof spread == "undefined" || spread == null) {
		spread = 0;
	}
	
	if (Math.random() > 0.5) { obj.x += Math.random() * spread; } else { obj.x -= Math.random() * spread; }
	if (Math.random() > 0.5) { obj.y += Math.random() * spread; } else { obj.y -= Math.random() * spread; }
	
	obj.dx = obj.x - obj.startX;
	obj.dy = obj.y - obj.startY;
		 
	obj.xdist = Math.abs(obj.dx);
	obj.ydist = Math.abs(obj.dy);
		
	obj.ratio = obj.speed / Math.sqrt(obj.xdist * obj.xdist + obj.ydist * obj.ydist);
		
	obj.move = function() {
		obj.x += obj.ratio * obj.dx;
		obj.y += obj.ratio * obj.dy;
	}
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
	}
	
	obj.tick = function() {
		obj.move();
		
		obj.lifetime--;
		
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
		
		ctx.arc(obj.x,obj.y,obj.width,0,2*Math.PI);
		ctx.fill();
		
		ctx.restore();
	}
	
	return obj;
}