module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc.js'
      }
    },

    jscs: {
      src: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/**/*.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['test']
    },

    versioncheck: {
      options: {
        hideUpToDate: false
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: [
          'test/*.js'
        ]
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: '.',
          cache: [
            'index.html',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
            'bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf?v=4.3.0',
            'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff?v=4.3.0',
            'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2?v=4.3.0',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/components-font-awesome/css/font-awesome.css',
            'bower_components/pnotify/pnotify.core.css',
            'bower_components/pnotify/pnotify.buttons.css',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/bootstrap-material-design/dist/js/material.js',
            'bower_components/d3/d3.js',
            'bower_components/gmaps/gmaps.js',
            'bower_components/lodash/lodash.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/marked/lib/marked.js',
            'bower_components/angular-marked/angular-marked.js',
            'bower_components/pnotify/pnotify.core.js',
            'bower_components/pnotify/pnotify.confirm.js',
            'bower_components/pnotify/pnotify.buttons.js',
            'bower_components/angular-pnotify/src/angular-pnotify.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/ng-appcache/dist/appcache.js'
          ],
          network: ['*'],
          fallback: ['/ /offline.html'],
          exclude: [],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
        },
        src: [
          'app/**/*.js',
          'assets/css/**/*.css',
          'assets/js/**/*.js',
          'app/views/**/*.html'
        ],
        dest: 'manifest.appcache'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-jscs')
  grunt.loadNpmTasks('grunt-version-check')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-manifest')

  grunt.registerTask('default', ['watch'])
  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'mochaTest'
  ])

  grunt.registerTask('help', 'Display some helpful information if no task provided', function() {
    this.async()
    grunt.util.spawn({
      grunt: true, args: ['--help']}, function(e, r, c) {
        grunt.log.writelns(r, '\n')
      })
  })
}
