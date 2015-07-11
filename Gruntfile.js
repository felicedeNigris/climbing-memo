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
    }

  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-jscs')
  grunt.loadNpmTasks('grunt-version-check')
  grunt.loadNpmTasks('grunt-mocha-test')

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
