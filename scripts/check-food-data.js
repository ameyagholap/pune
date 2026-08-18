const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "data", "food-joints.js"));

const joints = window.FOOD_JOINTS;
console.log("count:", joints.length);
joints.forEach(function (j) {
  var imgPath = path.join(__dirname, "..", j.image);
  var exists = fs.existsSync(imgPath);
  console.log((exists ? "OK  " : "MISS"), j.id, "|", j.image, "| est:", j.established || "(none)", "| credit:", j.credit || "(none)");
});
