const https = require("https");
const fs = require("fs");

console.log("HELLO WORLD");
https.get("https://dummyjson.com/users", (res) => {
  console.log("data fetched successfully");
});

fs.readFile("./Imp.txt", "utf-8", (err, data) => {
  console.log("file data", data);
});

setTimeout(() => {
  console.log("timeout method has been called");
}, 1000);

function mul(a, b) {
  return a * b;
}
