"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
var app = (0, express_1.default)();
app.use(express_1.default.json());
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
        return res.status(400).json({ error: "malformatted parameters" });
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
// POST /exercises
// expects JSON: { target: number, daily_exercises: number[] }
app.post("/exercises", function (req, res) {
    var _a = req.body, target = _a.target, daily_exercises = _a.daily_exercises;
    if (target === undefined || daily_exercises === undefined) {
        return res.status(400).json({ error: "parameters missing" });
    }
    if (typeof target !== "number" ||
        !Array.isArray(daily_exercises) ||
        daily_exercises.some(function (d) { return typeof d !== "number"; })) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    try {
        var result = (0, exerciseCalculator_1.calculateExercises)(daily_exercises, target);
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json({ error: "internal error" });
    }
});
// removed unused calculator route
