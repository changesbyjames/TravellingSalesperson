var cities = [];
var companies = [];
var totalCities = 12;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);
  var order = [];
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  companies.push(new Company(order, 300));  
  companies.push(new Company(order, 200));  
  companies.push(new Company(order, 100));
  companies.push(new SuperCompany(order, 1000));

}

function draw() {
  background(0);

  strokeWeight(4);
  noFill();

  companies.forEach(function(company, index) {
    var colorMapping = map(index, 0, companies.length, 0, 255);
    var c = color(colorMapping, 255, 50);
    stroke(c);

    company.calculateFitness();
    company.normalizeFitness();
    company.nextGeneration();

    company.show(companies.length, index);
  });
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    

    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];

    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
