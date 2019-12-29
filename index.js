const puppeteer = require('puppeteer');
const eventManager = require('./events').manager;
const config = require('./config');
const ping = require('./ping');
const lib = require('./lib');

let browser;
async function login() {
  console.log('Logging in ...' + new Date());

  try {
    browser = await puppeteer.launch({
      headless: config.heasdlessBrowser,
      executablePath: config.chromePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-spki-list',
      ]
    });
    const page = await browser.newPage();
    const url = config.sophosUrl;

    // dom element selectors
    const USERNAME_SELECTOR = '#username';
    const PASSWORD_SELECTOR = '#password';
    const BUTTON_SELECTOR = '#loginbutton';

    await page.goto(url);

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(config.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(config.password);

    await page.click(BUTTON_SELECTOR);
    await page.waitFor(2000);

    await page.screenshot({ path: 'status.png' });

    ping.exec();
  } catch (e) { 
    eventManager.emit('browser-error-raised');
  }
}

eventManager.on('pinged', () => {
  ping.exec();
});

eventManager.on('logged-out', () => {
  browser && browser.close();
  login();
});

eventManager.on('browser-error-raised', () => {
  setTimeout(login, lib.rand(config.checkInterval.min, config.checkInterval.max));

});

console.log('-----------------------');
console.log('-----------------------');
console.log('Welcome to auto login program!');
console.log('-----------------------');
login();
