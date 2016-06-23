// write a program that takes three parameters
// 1. lower case each of the parameters
// 2. take the first three characters of each string
// 3. log each of those
//
// i.e when you execute it you should see
// node DRY.js EXERCISES ARE AWESOME
// exe
// are
// awe
//
// remember this? process.argv

var arg1 = process.argv[2].toLowerCase().slice(0,3)
var arg2 = process.argv[3].toLowerCase().slice(0,3)
var arg3 = process.argv[4].toLowerCase().slice(0,3)

console.log(process.argv)
console.log(arg1)
console.log(arg2)
console.log(arg3)

