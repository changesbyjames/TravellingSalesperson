SuperCompany = function(originalOrder, popSize){
    this.population = [];
	this.recordDistance = Infinity;
	this.bestEver;
	this.currentBest;

	for (var i = 0; i < popSize; i++) {
		this.population[i] = new Salesperson(shuffle(originalOrder));
	}
}

SuperCompany.prototype = new Company;


SuperCompany.prototype.show = function (length, index) {

    stroke(51, 100, 100)
	push();
	scale(1/length)
	var scaleFactor = width/length * (index * length);
	translate(scaleFactor, 0)
	beginShape();
	for (var i = 0; i < this.bestEver.order.length; i++) {
		var n = this.bestEver.order[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 16, 16);
	}
	endShape();

	translate(0, height / 2);
	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();

	for (var i = 0; i < this.currentBest.order.length; i++) {
		var n = this.currentBest.order[i];
		
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 16, 16);
	}
	endShape();
	pop();
}