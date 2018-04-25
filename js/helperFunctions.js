//Returns true or false
function randomBool() {
	return (Math.random() > 0.5);
}

//Returns 1 (positive) or -1 (negative)
function randomSign() {
	if (randomBool()) {
		return 1;
	}
	return -1;
}

//Returns one of the arguments
function random() {
	return randomMember(arguments);
}

//Returns one of the array's members
function randomMember(arr) {
	if (!arr) {
		return undefined;
	}
	
	if (arr.length == 0) {
		return undefined;
	}
	
	var index = Math.floor(Math.random() * (arr.length));
	while (typeof index == "undefined") {
		index = Math.floor(Math.random() * (arr.length));
	}
	
	return(arr[index]);
}

function repeat(num, func) {
	for (var i = 0; i < num; i++) {
		func();
	}
}

function moveTowards(obj, x, y, speed) {

}

function radians(degrees) {
	return (degrees / 180 * Math.PI); 
}

function degrees(radians) {
	return (radians / Math.PI * 180);
}

function findSpawnpoint(minSpread, maxSpread) {
	while(true) {
		var x = (-maxSpread) + (Math.random() * (canvasWidth + maxSpread + maxSpread));
		var y = (-maxSpread) + (Math.random() * (canvasHeight + maxSpread + maxSpread));
	
		if (x <= -minSpread || x >= canvasWidth + minSpread) {
			if (y <= -minSpread || y >= canvasHeight + minSpread) {
				var obj = {};
				obj.x = x;
				obj.y = y; 
				
				return obj;
			}
		}
	}
}