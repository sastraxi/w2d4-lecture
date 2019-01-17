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

## Identity in Cookies
* make a `POST` endpoint for a login form
* make a login form, username and password
* `user_id => 15`
