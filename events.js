const events = require('events');

let manager;
if (!manager) {
    manager = new events.EventEmitter();
}

module.exports = {
    manager: manager
}