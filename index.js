const puppeteer = require('puppeteer');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const request = require('request');
const config = require('./config');

let browser;
async function login() {
  console.log('Logging in ...'+ new Date());
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
}

setInterval(() => {
  console.log('Checking the status... ' + new Date());
  request.get(
    'https://google.com',
    function (error, response, body) {
      if (error) {
        console.log('Logged out ...'+ new Date());
        eventEmitter.emit('logged-out');
        return;
      }
      console.log('Ok ...'+ new Date());
    }
  );
}, config.checkInterval);

eventEmitter.on('logged-out', () => {
  browser && browser.close();
  login();
});

console.log('-----------------------');
console.log('-----------------------');
console.log('Welcome to auto login program!');
console.log('-----------------------');
login();
