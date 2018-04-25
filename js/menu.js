var levelCount = 3;
var drawObjects = [];
var levelObjects = [];

var lockedText = "\u{1F512}";

canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;

localStorage.setItem("levelComplete0", true);

$(function() { //To be executed once the document is loaded	
	$(".canvas").attr("width", canvasWidth);
	$(".canvas").attr("height", canvasHeight);
	
	$(".canvas").css("cursor", "pointer");

	$(".canvas").click(click);
	$(".canvas").mousemove(mousemove);
	
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	for (var i = 1; i <= levelCount; i++) {
		var obj = levelSelectObj(i);
		
		levelObjects.push(obj);
		drawObjects.push(obj);
	}
});

function tick() {
	
}

function click(e) {
	var x = e.pageX;
	var y = e.pageY;
	
	levelObjects.forEach(function(o) {
		if (o.unlocked && x >= o.x && y >= o.y && x < o.x + o.width && y < o.y + o.height) {
			localStorage.setItem("currentLevel", o.num);
			window.location.href = "game.html";
		}
	});
}

function mousemove(e) {
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	
	drawObjects.forEach(function(o) {
		o.draw(e);
	});
}


var borderBuffer = 30;
var betweenBuffer = 20;
	
var width = 80;
var height = 80;
	
var levelsInRow = 1;
var b = canvasWidth - (borderBuffer * 2) - width;

while (b > width + betweenBuffer) {
	levelsInRow++;
	b -= (width + betweenBuffer);
}

function levelSelectObj(num) {
	var obj = {};
	
	var col = num % levelsInRow;
	var row = Math.floor(num / levelsInRow);
	
	var lockInformation = localStorage.getItem("levelComplete" + (num-1));
	console.log("Got " + lockInformation);
	
	obj.unlocked = Boolean(lockInformation);
	
	if (lockInformation == null) {
		obj.unlocked = false;
	}
	
	obj.x = borderBuffer + ((col + 1) * width) + (col * betweenBuffer);
	obj.y = borderBuffer + ((row + 1) * height) + (row * betweenBuffer);
	
	obj.num = num;
	
	obj.text = obj.num;
	if (!obj.unlocked) {
		obj.text = lockedText;
	}
	
	var c = num - 1;
	
	obj.width = width;
	obj.height = height;
	
	obj.draw = function(e) {
		console.log("Draw");
		
		var x = e.pageX;
		var y = e.pageY;
		
		ctx.save();
		
		ctx.globalAlpha = 0.4;
		
		if (x >= obj.x && y > obj.y) {
			if (x <= obj.x + obj.width && y <= obj.y + obj.height) {
				ctx.globalAlpha = 1;
			}
		}
		
		ctx.font = "20px Consolas";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.textAlign = "center";
		
		ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
		ctx.fillText(obj.text, obj.x + obj.width/2, obj.y + obj.height/2 + 5);
		
		ctx.restore();
	}
	
	return obj;
}