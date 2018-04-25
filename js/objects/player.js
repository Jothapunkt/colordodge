function playerBall() {
	var obj = {};
	
	obj.name = "Player";
	
	obj.priority = 1000;
	obj.cooldown = -1;
	
	obj.state = 0;
	obj.color = mainColors[obj.state];
	
	obj.x = 0.5 * canvasWidth;
	obj.y = 0.5 * canvasHeight;
	
	obj.radius = 30;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
		color = obj.color;
		
		if (obj.cooldown > 0) {
			color = mainColors[mainColors.length-1];
		}
		
		for (var i = 0; i < 30; i++) {
			var part = destructionParticle(color, obj.x, obj.y, 7, 0.003);
			part.speed = 1.5 * part.speed;
		}
	}
	
	obj.tick = function() {
		obj.cooldown--;
		
		var state = obj.state;
		var col = obj.color;
		if (obj.cooldown > 0) {
			col = mainColors[mainColors.length-1];
			state = 2;
		}
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		if (true || tick % 2 == 0) {
			rectangleParticle(col, obj.x, obj.y, 15, 0.007);
		}
		
		enemies.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.vulnerableState == state) {
					e.destroy();
				} else {
					gameOver();
				}
			}
		});
		
		projectiles.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.vulnerableState == state) {
					e.destroy();
				} else {
					gameOver();
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

function gameOver() {
	player.destroy();
	gameIsOver = true;
	console.log("Game Over");
	enemies.forEach(function(e,i) {
		setTimeout(function() { e.destroy(); }, i * 150);
	});
	projectiles.forEach(function(e,i) {
		setTimeout(function() { e.destroy(); }, i * 30);
	});
}