function enemyBall() {
	var obj = {};
	
	obj.name = "EnemyBall";
	
	obj.priority = 700;
	obj.speed = 1.1;
	
	obj.startBool = randomBool();
	obj.state = Number(obj.startBool);
	obj.vulnerableState = Number(!obj.startBool);
	obj.color = mainColors[obj.state];
	
	var spawnPoint = findSpawnpoint(5,100);
	
	obj.x = spawnPoint.x;
	obj.y = spawnPoint.y;
	
	obj.radius = 12;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
		
		if (!gameIsOver) {
			score++;
		}
		
		var i = enemies.indexOf(obj);
		enemies.splice(i, 1);
		
		for (var i = 0; i < 10; i++) {
			destructionParticle(obj.color, obj.x, obj.y, 5, 0.002);
		}
	}
	
	obj.tick = function() {
		obj.move();
		
		var col = obj.color;
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		if (globalTick % 2 == 0) {
			rectangleParticle(col, obj.x, obj.y, 5, 0.004);
		}
		
		enemies.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.state != obj.state) {
					e.destroy();
					obj.destroy();
				}
			}
		});
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

function enemyProjectile(shooter, targetX, targetY) {
	if (shooter.x <= globalTolerance || shooter.x >= canvasWidth - globalTolerance || shooter.y <= globalTolerance || shooter.y >= canvasHeight - globalTolerance) {
		//Do not spawn if out of bounds
		return;
	}
		
	var obj = {};
	
	projectiles.push(obj);
	
	obj.name = "EnemyProjectile";
	
	obj.priority = 700;
	obj.speed = 1.7;
	
	obj.state = shooter.state;
	obj.vulnerableState = Number(!obj.state);
	obj.color = mainColors[obj.state];
	
	obj.x = shooter.x;
	obj.y = shooter.y;
	
	obj.targetX = targetX;
	obj.targetY = targetY;
	
	obj.defaultRadius = 8;
	obj.radius = obj.defaultRadius;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	var dx = obj.targetX - obj.x;
	var dy = obj.targetY - obj.y;
		 
	var xdist = Math.abs(dx);
	var ydist = Math.abs(dy);
		
	var ratio = obj.speed / Math.sqrt(xdist * xdist + ydist * ydist);
		
	obj.vx = ratio * dx;
	obj.vy = ratio * dy;
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
		
		var i = projectiles.indexOf(obj);
		projectiles.splice(i, 1);
		
		for (var i = 0; i < 4; i++) {
			destructionParticle(obj.color, obj.x, obj.y, 5, 0.0018);
		}
	}
	
	obj.tick = function() {
		obj.radius = (0.8 * obj.defaultRadius) + (0.2 * obj.defaultRadius * Math.sin(radians(globalTick * 4 % 360)));
		
		obj.move();
		
		var col = obj.color;
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		projectiles.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.state != obj.state) {
					e.destroy();
					obj.destroy();
				}
			}
		});
	}
	
	obj.move = function() {
		var dx = obj.targetX - obj.x;
		var dy = obj.targetY - obj.y;
		 
		var xdist = Math.abs(dx);
		var ydist = Math.abs(dy);
		
		var ratio = obj.speed / Math.sqrt(xdist * xdist + ydist * ydist);
		
		obj.x += obj.vx;
		obj.y += obj.vy;
		
		var tolerance = globalTolerance;
		
		if (obj.x >= canvasWidth - tolerance || obj.x <= tolerance || obj.y >= canvasHeight - tolerance || obj.y <= tolerance) {
			obj.destroy();
		}
	}
	
	return obj;
}


function enemyTurret() {
	var obj = {};
	
	obj.name = "EnemyTurret";
	
	obj.priority = 700;
	obj.speed = 0.3;
	
	obj.startBool = randomBool();
	obj.state = Number(obj.startBool);
	obj.vulnerableState = Number(!obj.startBool);
	obj.color = mainColors[obj.state];
	
	var spawnPoint = findSpawnpoint(5,30);
	
	obj.x = spawnPoint.x;
	obj.y = spawnPoint.y;
	
	obj.radius = 12;
	
	obj.mask = circularCollisionMask(obj.radius, obj);
	
	tickHandler.register(obj);
	
	obj.destroy = function() {
		tickHandler.unregister(obj);
		if (!gameIsOver) {
			score+=2;
		}
		
		var i = enemies.indexOf(obj);
		enemies.splice(i, 1);
		
		for (var i = 0; i < 10; i++) {
			destructionParticle(obj.color, obj.x, obj.y, 5, 0.002);
		}
	}
	
	obj.tick = function() {
		obj.move();
		
		var col = obj.color;
		
		ctx.beginPath();
		ctx.arc(obj.x,obj.y,obj.radius,0,2*Math.PI);
		ctx.fillStyle = col;
		ctx.fill();
		
		if (globalTick % 2 == 0) {
			rectangleParticle(col, obj.x, obj.y, 5, 0.004);
		}
		
		if (globalTick % tickSpeed == 0) {
			enemyProjectile(obj, player.x, player.y);
		}
		
		enemies.forEach(function(e) {
			if (e.mask.collides(obj.mask)) {
				if (e.state != obj.state) {
					e.destroy();
					obj.destroy();
				}
			}
		});
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