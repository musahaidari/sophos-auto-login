module.exports = {
    pingHosts: [
        'https://www.google.com',
        'https://www.bing.com',
        'https://stackoverflow.com',
        'https://stackexchange.com',
        'https://medium.com',
        'https://www.npmjs.com',
        'https://getcomposer.org',
        'https://serverfault.com',
        'http://superuser.com',
        'https://ubuntu.com'     
    ],
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    sophosUrl: 'YOUR_FIREWALL_LOGIN_URL',
    heasdlessBrowser: true,
    checkInterval: {
        min: 10 * 1000,
        max: 20 * 1000
    },
    chromePath: '.\\node_modules\\puppeteer\\.local-chromium\\win64-706915\\chrome-win\\chrome.exe' // On windows
}