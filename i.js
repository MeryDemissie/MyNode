const _ = require('lodash');

const numbers = [10, 20, 5, 40, 15];
const maxNumber = _.max(numbers);
const minNumber = _.min(numbers);

console.log('Maximum number: ${maxNumber}');
console.log('Minimum number: ${minNumber}');