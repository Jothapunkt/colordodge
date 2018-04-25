function waveSpawner() {
	var obj = {};
	
	obj.data = levelData[level];
	
	obj.targetScore = obj.data.targetScore;
	
	console.log("Spawning waves for level " + level);
	
	obj.name = "WaveSpawner";
	
	tickHandler.register(obj);
	obj.tick = function() {
		if (gameIsOver) {
			return;
		}
		
		if (globalTick % tickSpeed != 0) { return; }
		
		var second = globalTick / tickSpeed;
		
		if (typeof obj.data.enemies[String(second)] != "undefined") {
			var toSpawn = obj.data.enemies[String(second)];
			
			var balls = toSpawn.balls;
			var turrets = toSpawn.turrets;
			
			if (typeof balls != "undefined") {
				repeat(balls, function() {
					enemies.push(enemyBall());
				});
			}
			
			if (typeof turrets != "undefined") {
				repeat(turrets, function() {
					enemies.push(enemyTurret());
				});
			}
		}
		
		
	}
	
	return obj;
}