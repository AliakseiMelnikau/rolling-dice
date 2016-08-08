var should = require('chai').should(),
    DiceExpression = require('../index'),
    assert = require('assert');

describe("DiceExpression('2d10 + 8')", function(){
    it("DiceExpression('2d10 + 8') should be max 28", function(){
        assert(new DiceExpression('2d10 + 8').max() == 28);
    });
    it("DiceExpression('2d10 + 8') should be min 10", function(){
        assert(new DiceExpression('2d10 + 8').min() == 10);
    });
});

describe("DiceExpression(-3)", function(){
    it("DiceExpression(-3) should always roll -3", function(){
        assert(new DiceExpression(-3).roll() == -3);
    });
    it("DiceExpression(-3) should be max -3", function(){
        assert(new DiceExpression(-3).max() == -3);
    });
    it("DiceExpression('2d10 + 8') should be min -3", function(){
        assert(new DiceExpression(-3).min() == -3);
    });
});

describe("DiceExpression('2d10 + 8 -  d%')", function(){
    it("DiceExpression('2d10 + 8 -  d%') should be max 27", function(){
        assert(new DiceExpression('2d10 + 8 -  d%').max() == 27);
    });
    it("DiceExpression('2d10 + 8 -  d%') should be min -90", function(){
        assert(new DiceExpression('2d10 + 8 -  d%').min() == -90);
    });
    it("DiceExpression('2d10 + 8 -  d%') should contain 4 independent rolls", function(){
        assert(new DiceExpression('2d10 + 8 -  d%').rollExplained().dice.length == 4);
    });
    it("DiceExpression('2d10 + 8 -  d%') independent rolls should equal to total", function(){
        var rollExplained = new DiceExpression('2d10 + 8 -  d%').rollExplained();
        var sum = rollExplained.dice.reduce(function(a, b) {return a + b;}, 0);
        assert(sum == rollExplained.total);
    });
});