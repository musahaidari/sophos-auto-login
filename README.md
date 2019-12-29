# Sophos auto login client
Sometimes it is a hassle to login to sophos firewall everytime it logs out, or when you have a background job ongoing and PC is locked. This software solves this problem for you by automatically checking if you are logged in and if not logs you in automatically. 

Referenced from https://github.com/altrosyn/sophos-client/blob/master/app.js

## How to set up
To set us this project do the followings:
1. Esure you node installed
2. Clone the project
3. Run `npm install`
4. From `config.sample.js` create `config.js` and fill it in with the proper values
5. In your root folder issue `node index.js`

## Notes
- Contributions and `pull request`'s are welcome!
- You can use `pm2` to keep the process running even if you log off from windows
- You can create `start.cmd` from `start-sample.cmd` and customize it to you own environments, and put its shortcut on the desktop for convenience.
