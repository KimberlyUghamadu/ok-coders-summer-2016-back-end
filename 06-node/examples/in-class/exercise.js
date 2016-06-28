function higherOrder(name,callback) {
  
  return callback(name)
  
}

//
function lowerAndSub(str) {
  return str.toLowerCase().slice(0,2)
}
function upperAndSub(str) {
  return str.toUpperCase().slice(0,2);
}
var lowerCaseName = higherOrder("Kimberly", lowerAndSub)

// Write anonymous functions when using higher order functions.

// regular anonymous function
var upperName = higherOrder("Kimberly", function(name) 
   {return name.toUpperCase().slice(0,3)})

// rocket anonymous function
var rocketUpper = higherOrder("Kimberly", name => name.toUpperCase().slice(0,3))
console.log(lowerCaseName)
console.log(upperName)
console.log(rocketUpper)
console.log(higherOrder("Kimberly", upperAndSub))

