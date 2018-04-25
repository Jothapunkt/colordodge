function scoreHandlerObject() {
	var obj = {};
	
	obj.name = "ScoreHandler";
	obj.done = false;
	
	obj.targetScore = levelData[level].targetScore;
	
	tickHandler.register(obj);
	obj.priority = 0;
	
	obj.tick = function() {		
		ctx.save();
		ctx.font = (0.12 * canvasHeight) + "px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.globalAlpha = 0.4;
		
		console.log(score / obj.targetScore);
		
		if (score == obj.targetScore) {
			ctx.fillStyle = "#ff9900";
		}
		
		ctx.fillText(score, canvasWidth/2, canvasHeight/2);
		
		ctx.beginPath();
		ctx.arc(canvasWidth/2, canvasHeight/2  - (0.03 * canvasHeight),0.15 * canvasHeight,0,2*Math.PI*(score / obj.targetScore));
		ctx.strokeStyle = ctx.fillStyle;
		ctx.stroke();
		
		ctx.restore();
		
		if (obj.done) { return; }
		
		if (score == obj.targetScore) {
			localStorage.setItem("levelComplete" + level, true);
			setTimeout(function() {
				window.location.href = "index.html";
			}, 2000);
		}
		
		
	}
}

var scoreHandler = scoreHandlerObject();