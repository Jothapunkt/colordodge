function probabilityTest() {
	var prob = [0,0,0,0,0];

	for (var i = 0; i < 1000; i++) {
		prob[random(0,1,2,3,4)]++;
	}

	prob.forEach(function(p, i) {
		console.log("Probability for " + i + ": " + (p/10) + "%");
	});
}