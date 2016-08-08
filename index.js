Dice = require('./model/Dice.js');
DiceParser = require('./parser/DiceParser');

function DiceExpression(exression) {
    this.dices = DiceParser.splitByDices(exression);
}

DiceExpression.prototype.roll = function () {
    var roll = 0;
    this.dices.forEach(function(dice){
        roll+=dice.roll();
    });
    return roll;
}

DiceExpression.prototype.rollExplained = function () {
    var rollExplained;
    this.dices.forEach(function(dice){
        if (rollExplained) {
            var currentRoll = dice.rollExplained();
            rollExplained.total += currentRoll.total;
            rollExplained.dice = rollExplained.dice.concat(currentRoll.dice);
        } else {
            rollExplained = dice.rollExplained();
        }
    });
    return rollExplained;
}

DiceExpression.prototype.min = function () {
    var min = 0;
    this.dices.forEach(function(dice){
        min+=dice.min();
    });
    return min;
}

DiceExpression.prototype.max = function () {
    var max = 0;
    this.dices.forEach(function(dice){
        max+=dice.max();
    });
    return max;
}

module.exports = DiceExpression;