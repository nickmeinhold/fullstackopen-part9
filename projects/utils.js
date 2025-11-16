"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExerciseArguments = exports.parseBmiArguments = void 0;
var parseBmiArguments = function (args) {
    if (args.length < 2)
        throw new Error("Not enough arguments. Provide height and weight.");
    var heightStr = args[0], weightStr = args[1];
    var height = Number(heightStr);
    var weight = Number(weightStr);
    if (isNaN(height) || isNaN(weight))
        throw new Error("Provided values were not numbers!");
    return { height: height, weight: weight };
};
exports.parseBmiArguments = parseBmiArguments;
var parseExerciseArguments = function (args) {
    // allow zero or more daily hours after the target
    if (args.length < 1)
        throw new Error("Not enough arguments. Provide at least the target value.");
    var target = Number(args[0]);
    if (isNaN(target))
        throw new Error("Target value is not a number");
    var hours = args.slice(1).map(function (h) {
        var n = Number(h);
        if (isNaN(n))
            throw new Error("Provided values were not numbers!");
        return n;
    });
    return { target: target, hours: hours };
};
exports.parseExerciseArguments = parseExerciseArguments;
