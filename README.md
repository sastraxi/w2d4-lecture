# [w2d4] User Authentication
Lecture for the Lighthouse Labs Web Development Immersive program.

https://web.compass.lighthouselabs.ca/days/w02d4/activities/487

## In this repository
Two branches:
* `master` contains sample code that demonstrates various auth techniques
* `live-coding` contains a barebones express stub

# Teacher's Notes

## HTTP is Stateless
* Every time you call your friend, they've forgotten everything about you
* The first part of your conversation would always be re-establishing your identity
* The pieces of data you send to the server to do this are called *cookies*

## Cookies
* `key => value` pairs
* live in your HTTP client
* expire after a while
* sent to the server on every* request via header
  * `Cookie: username=miguel; SESSION_ID=b9vn2x`
* can be set by the server via header or by client-side javascript:
  * server-side: `Set-Cookie: username=miguel` 
  * client-side: `browser.cookies.set({ name: 'username', value: 'miguel' })`
* can also be deleted
  * server-side: `Set-Cookie: username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  * client-side: `browser.cookies.set({ name: 'username' })`
* Chrome Inspector > Application > Cookies > (domain)

## Really basic authentication
* login form, username and password, app middleware is already done
* build user-db `[{ id, name, password }]`
* make a `POST` endpoint for the login form
  * look up username in an db and the password matches
  * set cookie `user_id => 2`
  * show a 400 error if the user can't found / password does not match
  * why doesn't it work? well, we need to pass username to template
    * `const user = userDatabase.find(x => x.id === +req.cookies.user_id)`, 
    * `user && user.name`

## bcrypt
* why not plaintext?
* refactor userDatabase into userService
* hash passwords
  * `genSaltSync(rounds)`, `hashSync(plain, salt)`
* `all`
* `find: predicate => users.find(predicate)`,
* `challenge(username, password)`
  * `compareSync(plain, hashed)`

## use cookie-session to prevent tampering
* show them in Chrome inspector
* introduce https://www.npmjs.com/package/cookie-session
  * `yarn add cookie-session`
  * `yarn add dotenv` and `require('dotenv').config()`
  * just set a secret and use `req.session` instead. Note: `req` not `res`!
  * add `.env`, `.env.example` and add to `.gitignore`
  * `process.env.SESSION_SECRET`
  * let's try to break it
    * `echo <hashed> | base64 -d`
    * `echo {\"user_id\":1} | base64 -w 0`

## cookies can be snooped by other people on the network!
* solution: HTTPS!
* set `{ secure: true }` to only set cookies under HTTPS, see it's broken
* `https` module to set up secure server
  * `https.createServer({ key, cert }, app).listen(port, () => ...)`
  * `fs.readFileSync(path)`
* build a self-signed cert
  * `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
  * add to `.gitignore`
* get a real certificate from Let's Encrypt!
