[![Build Status](https://travis-ci.org/cmizony/climbing_memo.svg)](https://travis-ci.org/cmizony/climbing_memo)
[![Coverage Status](https://coveralls.io/repos/cmizony/climbing_memo/badge.svg?branch=master)](https://coveralls.io/r/cmizony/climbing_memo?branch=master)
[![Codacy Badge](https://www.codacy.com/project/badge/14fe4dbebbf54586a11e1b7aa59879f2)](https://www.codacy.com/public/cmizony/climbing_memo)
[![Dependency Status](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa)
[![Dependency Status](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826)


# Climbing Memo

> Front-end application to visualize climbing data

* Datatable of climbing areas
* Scatter plot of attributes
* Geolocation using Google map

Demo
-----

Hosted demo is available on heroku at [climbing-memo.herokuapp.com](http://climbing-memo.herokuapp.com/)

Quick Start
-----

```sh
$ npm install
$ node_modules/.bin/bower install
$ node server.js
```
Create a [firebase account](https://www.firebase.com/) and configure your app URL in [app/app.js](app/app.js)

Run tests
-----


```sh
$ node_modules/.bin/mocha test -r jscoverage
```
