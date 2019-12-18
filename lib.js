const config = require('./config');
const events = require('events');

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    rand: rand
};