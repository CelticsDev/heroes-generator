module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*=============================
    =            WATCH            =
    =============================*/

    watch: {
      html: {
        files: ['src/heroes-generator.html',
                'src/html/*.html'],
        tasks: ['htmlmin', 'import','notify:done']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['browserify', 'notify:done', 'uglify']
      },
      css: {
        files: ['src/scss/*.scss',
                'src/scss/mixins/*.scss'],
        tasks: ['sass', 'import','notify:done']
      }
    },

    /*===================================
    =            MINIFY HTML            =
    ===================================*/

    htmlmin: {
       dist: {
         options: {
           gruntLogHeader: false,
           removeComments: true,
           collapseWhitespace: true
         },
         files: {
           'src/html/min/template.min.html': 'src/html/template.html' // CHANGE TEMPLATE NAME
         }
       }
     },

     /*====================================
     =            COMPILE SASS            =
     ====================================*/

    sass: {
      dist: {
        options: {
          gruntLogHeader: false,
          sourcemap: 'none',
        },
        files: {
          'dist/css/heroes-generator.css': 'src/scss/heroes-generator.scss'
        }
      },
      min: {
        options: {
          gruntLogHeader: false,
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'dist/css/heroes-generator.min.css': 'src/scss/heroes-generator.scss'
        }
      }
    },

    /*=========================================
    =            UGLIFY JAVASCRIPT            =
    =========================================*/

    uglify: {
      dist: {
        files: {
          'dist/js/heroes-generator.min.js': 'dist/js/heroes-generator.js'
        }
      }
    },

    /*==============================
    =            IMPORT            =
    ==============================*/

    import: {
      options: {},
      dist: {
        files: {
          gruntLogHeader: false,
          'dist/js/heroes-generator.js' : 'src/js/heroes-generator.js',
          'dist/heroes-generator.ready.html' : 'src/heroes-generator.html'
        }
      }
    },

    /*==================================
    =            browserify            =
    ==================================*/

    browserify: {
        dev: {
            src: [
                "src/js/heroes-generator.js"
            ],
            dest: 'dist/js/heroes-generator.js',
            options: {
                browserifyOptions: { debug: true },
                transform: [["babelify", { "presets": ["env"] }]],
            }
        }
    },

    /*==============================
    =            NOTIFY            =
    ==============================*/

    notify: {
      done: {
        options: {
          gruntLogHeader: false,
          title: 'Grunt - heroes-generator',
          message: 'DONE!',
        }
      }
    }
  });

  /*==================================
  =            LOAD TASKS            =
  ==================================*/

  require('grunt-log-headers')(grunt);
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-import');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default',['watch']);
};
