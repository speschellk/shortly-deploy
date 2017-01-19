module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { separator: ';' },
      dist: {
        src: ['public/client/**/*.js'],
        // dest will create basic.js file
        dest: 'public/dist/basic.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          //destination                   //source 
          'public/dist/basic.min.js': ['public/client/**/*.js']
        }
      }
    },

    eslint: {
      target: [
        'app/**/*.js', 'public/client/**/*.js', 'test/**/*.js', 'views/**/*.js', 'Gruntfile.js', 'server-config.js', 'server.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  // starting server node.js
  grunt.registerTask('server-prod', function(target) {
    grunt.task.run([ 'shell' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  // default task will run when we use grunt command:
  grunt.registerTask('default', []);

  grunt.registerTask('test', [
    'mochaTest', 'eslint'
  ]);

  grunt.registerTask('build', [
    //if mocha tests fail exit build process
    'test', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'server-prod' ]);  
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'test', 'build', 'upload'  
  ]);


};
