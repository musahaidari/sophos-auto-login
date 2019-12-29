const lib = require('./lib');
const events = require('events');
const config = require('./config');
const request = require('request');
const eventManager = require('./events').manager;

const getPingUrl = (urls) => {
    const minIndex = 0;
    const maxIndex = urls.length - 1;
    return urls[lib.rand(minIndex, maxIndex)];
}

const exec = () => {
    const pingUrl = getPingUrl(config.pingHosts);
    console.log('Pinging [' + pingUrl + ']: ' + new Date());
    request.get(
        pingUrl,
        function (error, response, body) {
            if (error) {
                console.error(error);
                console.log('Logged out ...' + new Date());
                eventManager.emit('logged-out');
                return;
            }
            console.log('Ok ...' + new Date());
            setUpNextPing();
        }
    );
}

const setUpNextPing = () => {
    const timeToWait = lib.rand(config.checkInterval.min, config.checkInterval.max);
    setTimeout(() => {
        eventManager.emit('pinged');
    }, timeToWait);
}

module.exports = {
    exec: exec
};