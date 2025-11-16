"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bmiCalculator_1 = require("./bmiCalculator");
test("calculateBmi for 180 cm and 74 kg returns Normal (healthy weight)", function () {
    expect((0, bmiCalculator_1.calculateBmi)(180, 74)).toBe("Normal range");
});
test("calculateBmi identifies Underweight", function () {
    expect((0, bmiCalculator_1.calculateBmi)(180, 55)).toBe("Underweight");
});
test("calculateBmi identifies Overweight", function () {
    expect((0, bmiCalculator_1.calculateBmi)(180, 85)).toBe("Overweight");
});
test("calculateBmi identifies Obese", function () {
    expect((0, bmiCalculator_1.calculateBmi)(160, 90)).toBe("Obese");
});
