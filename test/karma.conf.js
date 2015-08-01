// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-26 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/d3/d3.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/bootstrap-material-design/dist/js/material.js',
      'bower_components/bootstrap-material-design/dist/js/ripples.js',
      'bower_components/marked/lib/marked.js',
      'bower_components/angular-marked/angular-marked.js',
      'bower_components/lodash/lodash.js',
      'bower_components/pnotify/pnotify.core.js',
      'bower_components/pnotify/pnotify.buttons.js',
      'bower_components/pnotify/pnotify.callbacks.js',
      'bower_components/pnotify/pnotify.confirm.js',
      'bower_components/pnotify/pnotify.desktop.js',
      'bower_components/pnotify/pnotify.history.js',
      'bower_components/pnotify/pnotify.nonblock.js',
      'bower_components/angular-pnotify/src/angular-pnotify.js',
      'bower_components/ng-appcache/dist/appcache.js',
      'bower_components/ng-appcache/dist/appcache.min.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-google-maps/dist/angular-google-maps.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-coverage"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};