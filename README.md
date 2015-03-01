[![Build Status](https://travis-ci.org/cmizony/climbing_memo.svg)](https://travis-ci.org/cmizony/climbing_memo)
[![Coverage Status](https://coveralls.io/repos/cmizony/climbing_memo/badge.svg?branch=master)](https://coveralls.io/r/cmizony/climbing_memo?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa)
[![Dependency Status](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826)

# Climbing Memo

> Front-end application to visualize climbing data

* Datatable of climbing areas
* Scatter plot of attributes
* Geolocation using Google map

Demo
-----

Hosted demo is available at [cmizony.com/climbing](http://cmizony.com/climbing)

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
