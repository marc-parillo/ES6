var multiply = require('./multiply');

function MyLibrary() {
  this.aSetting = 2;
};

MyLibrary.prototype.doWork = function() {
  console.log('the answer is: ',multiply(2,10));
}

module.exports = MyLibrary;