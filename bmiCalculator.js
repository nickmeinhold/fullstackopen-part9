"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
var utils_1 = require("./utils");
var calculateBmi = function (height, weight) {
    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi < 25) {
        return "Normal range";
    }
    else if (bmi < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
exports.calculateBmi = calculateBmi;
if (require.main === module) {
    try {
        var args = process.argv.slice(2);
        var _a = (0, utils_1.parseBmiArguments)(args), height = _a.height, weight = _a.weight;
        console.log((0, exports.calculateBmi)(height, weight));
    }
    catch (e) {
        if (e instanceof Error) {
            console.log("Error:", e.message);
        }
        else {
            console.log("Unknown error");
        }
    }
}
