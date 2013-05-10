module.exports = function(grunt) {

  // Imports
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-webfont');

  // Project configuration.
  grunt.initConfig({
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/assets',
            src: ['**/*'],
            dest: 'client/'
          }
        ]
      },
      scripts: {
        files: [
          {
            expand: true,
            cwd: 'src/scripts',
            src: ['**/*'],
            dest: 'client/scripts'
          }
        ]
      }
    },

    webfont: {
      icons: {
        src: 'src/svg-to-fonts/*.svg',
        dest: 'client/fonts',
        destCss: 'src/styles',
        options: {
          stylesheet: 'scss',
          hashes: false,
          htmlDemo: false,
          syntax: 'bootstrap',
          relativeFontPath: '../fonts'
        }
      }
    },

    clean: ['client'],

    compass: {
      dist: {
        options: {
          sassDir: 'src/styles',
          cssDir: 'client/styles',
          noLineComments: true,
          relativeAssets: true,
          fontsDir: 'client/fonts',
          require: ['animation']
        }
      }
    },

    regarde: {
      assets: {
        files: 'src/assets/**/*',
        tasks: ['copy:assets']
      },
      scripts: {
        files: ['src/scripts/**/*.js', 'src/scripts/**/*.html'],
        tasks: ['copy:scripts']
      },
      styles: {
        files: 'src/styles/**/*.scss',
        tasks: ['compass']
      }
    }
  });

  // Tasks
  grunt.registerTask('default', ['dev', 'regarde']);
  grunt.registerTask('dev', ['clean', 'copy', 'webfont', 'compass']);

  // Create custom tasks
  grunt.registerTask('server', 'Start the web server', function() {
    grunt.log.writeln('Started web server on port 3000');
    require('./server/index.js');
  });

};