
var Polygon = require("./Polygon");
var p = new Polygon(10,10);
console.log(p.calcArea(),p.area);

var multiply = require('./multiply');
console.log(multiply(2, 3));

import { divide } from './divide';
console.log(divide(10, 5));

module.exports = require('./lib');