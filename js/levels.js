var levelData = [];
var levelCount = 3;

repeat(levelCount, function() {
	levelData.push({});
});

levelData.forEach(function(l) {
	l.enemies = {};
	l.description = "Generic level description";
	l.targetScore = 1;
});

var one = levelData[1];

one.targetScore = 50;

one.enemies["1"] = { balls: 3 };
one.enemies["3"] = { balls: 5 };
one.enemies["6"] = { balls: 4 };
one.enemies["10"] = { balls: 5 };
one.enemies["13"] = { balls: 4 };
one.enemies["15"] = { balls: 2 };
one.enemies["18"] = { balls: 5 };
one.enemies["19"] = { balls: 2 };

one.enemies["28"] = { balls: 5 };
one.enemies["29"] = { balls: 5 };
one.enemies["30"] = { balls: 5 };
one.enemies["31"] = { balls: 5 };

var two = levelData[2];

two.targetScore = 80;

two.enemies["1"] = {turrets: 1};
two.enemies["4"] = {balls: 5};
two.enemies["7"] = {balls: 2, turrets: 2};
two.enemies["10"] = {balls: 3, turrets: 2};
two.enemies["14"] = {balls: 5, turrets: 3};
two.enemies["17"] = {balls: 3, turrets: 2};
two.enemies["19"] = {balls: 2, turrets: 2};

two.enemies["28"] = {balls: 4, turrets: 4};
two.enemies["29"] = {balls: 4, turrets: 4};
two.enemies["30"] = {balls: 4, turrets: 4};

