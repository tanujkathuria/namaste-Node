// require("./xyz.js");
// const obj = require("./sum.js");
// const { calculateSum, x } = require("./sum.js");
// import { calculateSum, x } from "./sum.js";
const { calculateMultiply, calculateSum } = require("./calculate");
var a = 1;
console.log(a);

var b = 2;
console.log(b);

// console.log(global);
// console.log(this); // this is an empty object and not equal to the global object
// console.log(globalThis);
calculateSum(1, 2);
// console.log(x);
calculateMultiply(1, 2);
// console.log(module.exports);
