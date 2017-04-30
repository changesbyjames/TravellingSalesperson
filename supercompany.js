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
	Company.prototype.show.call(this, length, index);
}