"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
var calculateExercises = function (dailyHours, target) {
    var periodLength = dailyHours.length;
    var trainingDays = dailyHours.filter(function (h) { return h > 0; }).length;
    if (periodLength === 0) {
        // No data: return a sensible default without dividing by zero
        var average_1 = 0;
        var success_1 = false;
        var rating_1 = 1;
        var ratingDescription_1 = 'you need to exercise more';
        return {
            periodLength: periodLength,
            trainingDays: trainingDays,
            success: success_1,
            rating: rating_1,
            ratingDescription: ratingDescription_1,
            target: target,
            average: average_1,
        };
    }
    var sum = dailyHours.reduce(function (acc, cur) { return acc + cur; }, 0);
    var average = sum / periodLength;
    var success = average >= target;
    // rating: 3 = excellent (>= target), 2 = okay (>= 75% of target), 1 = poor
    var rating;
    var ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = "great job, target met";
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "you need to exercise more";
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};
exports.calculateExercises = calculateExercises;
var utils_1 = require("./utils");
if (require.main === module) {
    try {
        var args = process.argv.slice(2);
        var _a = (0, utils_1.parseExerciseArguments)(args), target = _a.target, hours = _a.hours;
        console.log(calculateExercises(hours, target));
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
