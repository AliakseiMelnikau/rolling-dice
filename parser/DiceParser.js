Dice = require('../model/Dice.js');

const OPERAND = 'operand';
const OPERATION = 'operation';
const PERCENT_SIGN_INT_VALUE = 100;

function parseDiceExpressions(expression) {
    if (Number.isInteger(expression)) {
        return [new Dice({fixedValue: Math.abs(expression),
            isNegative:(expression<0)})];
    }
    var dices = expression.trim().split(/(\+|\-)/g).filter(function(el) {return el.length != 0});
    if (dices.length==0) {
        throw new Error('No DiceExpression in the string : ' + expression);
    }
    var previousToken;
    var parsedDices = [];
    dices.forEach(function(currentToken){
        if (getTokenType(currentToken) == getTokenType(previousToken)) {
            throw new Error('Two ' + getTokenType(currentToken) + ' in a row');
        }
        if (getTokenType(currentToken)==OPERAND) {
            parsedDices.push(parseSingleDiceExpression(currentToken,previousToken))
        }
        previousToken = currentToken;
    });
    return parsedDices;
}

function parseSingleDiceExpression(token,previousToken) {
    var diceParsed = token.trim().toLowerCase().split(/(d)/g).filter(function(el) {return el.length != 0});

    if (diceParsed.length==1 && isValidInteger(diceParsed[0])) {
        return new Dice({fixedValue: parseInt(diceParsed[0]), isNegative:isNegation(previousToken)});
    } else if (diceParsed.length==2 && diceParsed[0]=='d' && (isValidNumberOrPercentSign(diceParsed[1]))) {
        return new Dice({sides: (isValidInteger(diceParsed[1])?parseInt(diceParsed[1]):PERCENT_SIGN_INT_VALUE), isNegative:isNegation(previousToken)});
    } else if (diceParsed.length==3 && isValidInteger(diceParsed[0]) && diceParsed[1]=='d' && (isValidNumberOrPercentSign(diceParsed[2]))) {
        return new Dice({quantity: parseInt(diceParsed[0]), sides: (isValidInteger(diceParsed[2])?parseInt(diceParsed[2]):PERCENT_SIGN_INT_VALUE),
            isNegative:isNegation(previousToken)});
    } else {
        throw new Error('Invalid dice expression ' + token);
    }
}

function getTokenType(token) {
    if (!token) {
        return undefined;
    }
    return isOperation(token)?OPERATION:OPERAND;
}

function isOperation(token) {
    return token == '+' || token == '-';
}

function isNegation(token) {
    return token == '-';
}

function isValidInteger(value) {
    return value.match(/^\d+$/g);
}

function isValidNumberOrPercentSign(value) {
    return isValidInteger(value) || value == '%';
}

module.exports = {
    splitByDices: function(expression) {
        return parseDiceExpressions(expression);
    }
};