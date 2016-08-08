var random = require("random-js")();

function Dice(data) {
    this.data = data;
    if(!data.hasOwnProperty("isNegative")){
        this.data.isNegative = false;
    }
    if(!data.hasOwnProperty("quantity")){
        this.data.quantity = 1;
    }
}

Dice.prototype.get = function (name) {
    return this.data[name];
}

Dice.prototype.set = function (name, value) {
    this.data[name] = value;
}

Dice.prototype.max = function () {
    if (this.get('isNegative')) {
        return this.getMinAbs() * (-1);
    } else {
        return this.getMaxAbs();
    }
};

Dice.prototype.min = function () {
    if (this.get('isNegative')) {
        return this.getMaxAbs() * (-1);
    } else {
        return this.getMinAbs();
    }
};

Dice.prototype.roll = function () {
    if (this.get('fixedValue')) {
        return this.getSignedValue(this.get('fixedValue'));
    } else {
        var total=0;
        for (var i=0;i<this.get('quantity');i++) {
            total+=this.getSignedValue(random.integer(1, this.get('sides')));
        }
        return total;
    }
};

Dice.prototype.rollExplained = function () {
    var total = 0;
    if (this.get('fixedValue')) {
        total = this.getSignedValue(this.get('fixedValue'));
        return {total:total,dice:[total]};
    } else {
        var individualRolls = [];
        for (var i=0;i<this.get('quantity');i++) {
            var individualRoll = this.getSignedValue(random.integer(1, this.get('sides')));
            individualRolls.push(individualRoll);
            total+=individualRoll;
        }
        return {total:total,dice:individualRolls};
    }
};

Dice.prototype.getSignedValue = function (value) {
    return value * (this.get('isNegative')?-1:1);
}

Dice.prototype.getMinAbs = function () {
    if (this.get('fixedValue')) {
        return this.get('fixedValue');
    }
    return this.get('quantity');
}

Dice.prototype.getMaxAbs = function () {
    if (this.get('fixedValue')) {
        return this.get('fixedValue');
    }
    return this.get('quantity') * this.get('sides');
}

module.exports = Dice;



