
var myModule = {};

myModule.sayHello = function() {
  console.log('Hello!');
};

myModule.sayBye = function(name) {
  console.log(`Bye, ${name}!`);
};

module.exports = myModule; // magic is here
