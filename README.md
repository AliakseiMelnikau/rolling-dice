rolling-dice
=========

Small library providing possibility to imitate rolling of the dice with user-defined DiceExpressions.

## Installation

  npm install rolling-dice

## Usage

### DiceExpression

A DiceExpression is defined as follows:

```
DiceExpression => Integer
DiceExpression => x?(d|D)y where x is the # of dice and y the sides.
DiceExpression => x?(d|D)% where x is the # of dice and '%' = 100
DiceExpression => DiceExpression +/- DiceExpression
```

### Code sample

```javascript
DiceExpression = require('rolling-dice');

var de = new DiceExpression('2d10 + 8 -  d%');
de.roll(); // 10
de.rollExplained(); // { total: -17, dice: [ 2, 1, 9, -29 ] }
de.max(); // 27
de.min(); // -90
```

## Tests

  npm test

## Release History

* 0.1.0 Initial release