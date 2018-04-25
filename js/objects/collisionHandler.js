function circularCollisionMask(radius, holder) {
	var obj = {};
	
	obj.name = "CircularCollisionMask";
	
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


