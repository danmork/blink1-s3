const Blink1 = require("node-blink1");
const colors = require("color-name");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bucket = "com.humanstuff.blink1";
const key = "color.json";

var light = new Blink1();
var timeout = 1000;

function getColor(callback) {
  var params = { Bucket: bucket, Key: key };
  s3.getObject(params, callback);
}

function changeColor() {
  getColor(function (err, result) {
    if (err) {
      console.log("Error", err);
    }
    else {
      var body = JSON.parse(result.Body.toString());
      var colorName = body.color;
      var color = colors[colorName];
      if (color) {
        console.log("Setting the color to", colorName);
        light.setRGB(color[0], color[1], color[2]);
      } else {
        console.log("Unknown color", colorName);
      }
    }
    setTimeout(changeColor, timeout);
  });  
}

setTimeout(changeColor);  
