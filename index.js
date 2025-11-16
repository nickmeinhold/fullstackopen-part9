"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var app = (0, express_1.default)();
app.get("/hello", function (_req, res) {
    res.send("Hello Full Stack!");
});
app.get("/ping", function (_req, res) {
    res.send("pong");
});
// GET /bmi?height=180&weight=72
app.get("/bmi", function (req, res) {
    if (!req.query.height || !req.query.weight) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    var heightNum = Number(req.query.height);
    var weightNum = Number(req.query.weight);
    if (isNaN(heightNum) || isNaN(weightNum)) {
    }
    try {
        var bmi = (0, bmiCalculator_1.calculateBmi)(heightNum, weightNum);
        return res.json({ weight: weightNum, height: heightNum, bmi: bmi });
    }
    catch (e) {
        return res.status(500).json({ error: "internal error" });
    }
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
