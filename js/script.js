$(function() { //To be executed once the document is loaded
	
	globalTick = 0;
	
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;

	$(".canvas").attr("height", canvasHeight);
	$(".canvas").attr("width", canvasWidth);

	var canvas = document.getElementById("canvas");
	player = playerBall();
	ctx = canvas.getContext("2d");
	
	tickInterval = window.setInterval(function() {
		globalTick++;
		
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		tickHandler.tick();
	}, tickInterval);
	
	$(".canvas").mousemove(player.updatePosition);
	$(".canvas").click(player.switchState);
	
	spawner = waveSpawner();
});