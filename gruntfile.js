/// <binding ProjectOpened='dev, test' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

'use strict';

module.exports = function (grunt) {
    var manifest = require('./manifest.js');

    var envConfig = {
        options : {
        },
        dev: {
            NODE_ENV : 'DEVELOPMENT'
        },
        prod : {
            NODE_ENV : 'PRODUCTION'
        }
    };

    var jsHintConfig = {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            undef: true,
            unused: true,
            strict: true,
            globals: {
                "beforeEach": true,
                "it": true,
                "describe": true,
                "angular": true,
                "module": true,
                "OidcTokenManager": true,
                "expect": true,
                "inject": true
            },
            reporter: require('jshint-stylish')
        },
        all: ['<%= manifest.js.app %>', '<%= manifest.js.test %>']
    };

    var includeSourceConfig = {
        options: {

        },
        index: {
            src: ['index.html'],
            dest: 'index.html'
        }
    };

    var wireDepConfig = {
        task: {
            src: ['index.html', 'manifest.js']
        }
    };

    var cleanConfig = {
        build: ['build/', 'dist/']
    }

    var ngAnnotateConfig = {
        options: {
            singleQuotes: true
        },
        app: {
            expand: true,
            cwd: 'scripts/',
            src: ['**/*.js'],
            dest: 'build/ngAnnotate/'
        }
    };

    var karmaConfig = {
        unit: {
            options: {
                reporters: ['progress'],
                files: [
                    '<%= manifest.js.bower %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    '<%= manifest.js.app %>',
                    '<%= manifest.js.test %>'
                ],
                frameworks: ['jasmine'],
                browsers: ['PhantomJS'],
                singleRun: true
            }
        }
    };

    var preprocessConfig = {
        app: {
            src : 'index.tpl.html',
            dest : 'index.html'
        }
    };

    var html2jsConfig = {
        app: {
            options: {
                base: './build/htmlmin/',
                module: 'aveva.online.templates'
            },
            src: ['build/htmlmin/**/*.html'],
            dest: 'build/templates.js'
        }
    };

    var concatConfig = {
        js: {
            src: [
                '<%= manifest.js.bower %>',
                '<%= ngAnnotate.app.dest %>' + '**/*.js',
                '<%= html2js.app.dest %>'
            ],
            dest: 'build/concatOutput.js'
        },
        css: {
            src: '<%= manifest.css %>',
            dest: 'build/concatOutput.css' 
        }
    };

    var uglifyConfig = {
        prod: {
            files: {
                'dist/aveva.online.min.js': '<%= concat.js.dest %>'
            }
        }
    };

    var cssminConfig = {
        target: {
            src: '<%= concat.css.dest %>',
            dest: 'dist/aveva.online.min.css'
        }
    };

    var htmlminConfig = {
        target: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                expand: true,
                src: '<%= manifest.templates %>',
                dest: 'build/htmlmin/'
            }]
        }
    };

    var bootlintConfig = {
        options: {
            relaxerror: {
                'E001': ['<%= manifest.templates %>'],
                'W001': ['<%= manifest.templates %>'],
                'W002': ['<%= manifest.templates %>'],
                'W003': ['<%= manifest.templates %>'],
                'W005': []
            }
        },
        files: ['<%= manifest.templates %>', 'index.tpl.html']
    }

    var watchConfig = {
        all: {
            files: [
                'index.tpl.html',
                'gruntfile.js',
                'bower.json',
                '<%= manifest.js.test %>',
                '<%= manifest.js.app %>'
            ],
            tasks: ['env:dev', 'jshint', 'bootlint', 'preprocess', 'wiredep', 'includeSource', 'karma'],
            options: {
                spawn: false,
                atBegin: true,
                reload: true
            }
        }
    };

    var gruntConfig = {
        includeSource: includeSourceConfig,
        wiredep: wireDepConfig,
        ngAnnotate: ngAnnotateConfig,
        clean: cleanConfig,
        watch: watchConfig,
        karma: karmaConfig,
        jshint: jsHintConfig,
        env: envConfig,
        preprocess: preprocessConfig,
        concat: concatConfig,
        html2js: html2jsConfig,
        uglify: uglifyConfig,
        cssmin: cssminConfig,
        htmlmin: htmlminConfig,
        bootlint: bootlintConfig
    };

    grunt.initConfig(grunt.util._.extend(gruntConfig, manifest));

    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-bootlint');

    grunt.registerTask('dev', ['watch']);

    grunt.registerTask('prod', ['env:prod', 'clean', 'preprocess', 'wiredep', 'jshint', 'bootlint', 'karma', 'ngAnnotate', 'htmlmin', 'html2js', 'concat', 'uglify', 'cssmin', 'includeSource']);
};