var path = require('path');
var shell = require('shelljs');

module.exports = function(grunt) {

    /*************************************************************************/
    // Clean
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', [ 'public' ]);

    /*************************************************************************/
    // Less
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-less');
    var lessRoot = 'src/less/';
    var lessPattern = '**/*.less';
    grunt.config('less', {
        all: {
           files: [{
               expand: true,
               cwd: lessRoot,
               src: [lessPattern],
               dest: 'public/css',
               ext: '.css'
            }],
        },
        options: {
            cleancss: true
        }
    });

    /*************************************************************************/
    // Js / Html / External client stuff
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-copy');
    var jsRoot = 'src/js/';
    var jsPattern = '**/*.js';
    var htmlRoot = 'src/html/';
    var htmlPattern = '**/*.html';
    grunt.config('copy', {
        html: {
            expand: true,
            cwd: 'src/html',
            src: '**',
            dest: 'public/html'
        },
        bootstrap: {
            expand: true,
            cwd: 'src/ext/bootstrap/css',
            src: 'bootstrap.css',
            dest: 'public/css'
        }
    });

    /*************************************************************************/
    // Compile underscore templates
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.config('jst', {
        compile: {
            options: {
                namespace: 'Fretboarder.Templates',
                processName: function(filename) {
                    return path.basename(filename, '.tmpl');
                },
                prettify: true,
                templateSettings: { variable: 'data' }
            },
            files: {
                "public/js/templates.js": ["src/templates/*.tmpl"]
            }
        }
    });

    /*************************************************************************/
    // Concat
    /*************************************************************************/    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        extjs: {
            src: [ 'src/ext/js/jquery.min-1.10.2.js',
                   'src/ext/bootstrap/js/bootstrap.min.js',
                   'src/ext/js/underscore-min-1.5.1.js',
                   'src/ext/js/backbone-min.js',
                   'src/ext/js/backbone.marionette.min.js',
                   'src/ext/js/d3.v3.min.js' ],
            dest: 'public/js/deps.js'
        },
        js: {
            src: ['public/js/templates.js', 'src/js/**/*.js'],
            dest: 'public/js/fretboarder.js',
            options: {
                banner: ';(function() {\n',
                separator: '\n})();\n(function() {\n',
                footer: '})();\n'
            }
        }
    });

    /*************************************************************************/
    // Restart node app
    /*************************************************************************/

    // TODO: can't store pid in zePid because it seems to get erased in between invocations
    // of grunt. Find a different way.

    var nodePid = null;
    grunt.registerTask('app', 'restart node app', function() {
        console.log("********** RESTARTING THE SERVER **********");
        if (nodePid) {
            console.log('killing old node process (nodePid ' + nodePid + ')');
            shell.exec('kill ' + nodePid);
        }
        var f = shell.exec('node app.js', { async: true });
        nodePid = f._handle.pid;
        console.log('new node process has pid ' + f._handle.pid);
        console.log("********** RESTARTED THE SERVER **********");
    });

    /*************************************************************************/
    // Watch
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        code: {
            files: ['src/**/*', 'Gruntfile.js'],
            tasks: ['default'],
            options: { atBegin: true }
        },
        ext: {
            files: [path.join('src/ext/**/*.*')],
            tasks: ['default'],
        },
        app: {
            files: 'app.js',
            tasks: ['app'],
            options: {
                atBegin: true,
                nospawn: true
            }
        }
    });

    grunt.registerTask('default', [ 'clean', 'less', 'copy', 'jst', 'concat' ]);
};