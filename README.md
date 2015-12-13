[![Build Status](https://travis-ci.org/cmizony/climbing-memo.svg?branch=master)](https://travis-ci.org/cmizony/climbing-memo)
[![Coverage Status](https://coveralls.io/repos/cmizony/climbing-memo/badge.svg?branch=master&service=github)](https://coveralls.io/github/cmizony/climbing-memo?branch=master)
[![Codacy Badge](https://www.codacy.com/project/badge/14fe4dbebbf54586a11e1b7aa59879f2)](https://www.codacy.com/public/cmizony/climbing_memo)
[![Dependency Status](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54e567e1d1ec573c990006aa)
[![Dependency Status](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826/badge.svg?style=flat)](https://www.versioneye.com/user/projects/54f3a16f4f31083e1b000826)

---
---

# Warning!

**The repository has been moved within it's own organization to [github.com/10alab/Siurana](https://github.com/10alab/Siurana)**

No further updates will be made on *cmizony/climbing-memo*

---
---

# Climbing Memo

> Front-end application to visualize climbing data

* Table of climbing routes
* Markdown support for notes
* Map of routes using Google Map API
* Charts generated with D3.js
* Offline mode (read only)
* Responsive design

Demo
-----

Hosted demo is available on heroku at [climbing-memo.herokuapp.com](http://climbing-memo.herokuapp.com/)

[![App screenshot](http://goo.gl/kaM5Sw)](http://climbing-memo.herokuapp.com)

Quick Start
-----

Make sure to have `npm`, `grunt` and `bower` installed.

Create a [firebase account](https://www.firebase.com/) and configure your database in [app.js](app/scripts/app.js#L30)


```sh
$ npm install && npm start
```

Developement
-----

To start a developement server `grunt serve` and to run unit-tests `grunt test`

**Technologies:**

* Database:        Firebase
* Deployement:     Travis + Heroku
* Framework:       AngularJS
* Generator:       Yeoman-angular
* Style:           Sass + Bootstrap material design
* Tests:           Karma + Jasmine + Coveralls
* Validators:      Jshint + Jscs
* Visualizations:  D3 + Angular Gmap
* WebServer:       NodeJS & Grunt-http
