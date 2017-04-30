function Company(originalOrder, popSize) {
	this.population = [];
	this.recordDistance = Infinity;
	this.bestEver;
	this.currentBest;

	for (var i = 0; i < popSize; i++) {
		this.population[i] = new Salesperson(shuffle(originalOrder));
	}

}

Company.prototype.calculateFitness = function () {
	var currentRecord = Infinity;

  for (var i = 0; i < this.population.length; i++) {
    var d = calcDistance(cities, this.population[i].order);

    if (d < this.recordDistance) {
      this.recordDistance = d;
      this.bestEver = this.population[i];
    }

		if (d < currentRecord) {
      currentRecord = d;
      this.currentBest = this.population[i];
    }

    this.population[i].fitness = 1 / (d + 1);
  }
};

Company.prototype.normalizeFitness = function () {
	var sum = 0;
	this.population.forEach(function (value, i) {
		sum += value.fitness;
	});

	this.population.forEach(function (value, i) {
		value.fitness = value.fitness / sum;
	});
};

Company.prototype.nextGeneration = function () {
	var newPopulation = [];

	this.population.forEach(function(value, key){
		var salespersonA = this.pickOne(this.population);
		var salespersonB = this.pickOne(this.population);
		var order = this.crossOver(salespersonA.order, salespersonB.order);
		this.mutate(order, 0.01);
		newPopulation[key] = new Salesperson(order);
	}, this);

	this.population = newPopulation;
};

Company.prototype.pickOne = function (list) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - list[index].fitness;
    index++;
  }
  index--;
	return list[index];
};


Company.prototype.crossOver = function (orderA, orderB) {
	var start = floor(random(orderA.length));
	var end = floor(random(start + 1, orderA.length));
	var neworder = orderA.slice(start, end);
	// var left = totalCities - neworder.length;
	for (var i = 0; i < orderB.length; i++) {
		var city = orderB[i];
		if (!neworder.includes(city)) {
			neworder.push(city);
		}
	}
	return neworder;
};

Company.prototype.mutate = function (order, rate) {
	for (var i = 0; i < totalCities; i++) {
			if (random(1) < rate) {
				var indexA = floor(random(order.length));
				var indexB = (indexA + 1) % totalCities;
				swap(order, indexA, indexB);
			}
		}
};

Company.prototype.show = function (length, index) {
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