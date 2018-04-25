//Stores all Instances that rely on tick handling

function tickHandlerClass() {
	var obj = {};
	
	obj.name = "TickHandler";
	
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
