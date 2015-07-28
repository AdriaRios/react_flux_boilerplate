var lrload = require('livereactload');

module.exports = function (grunt) {
    'use strict';

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            target: [
                './src/**/*.js',
                '!./src/**/*.spec.js'
            ]
        },
        browserify: {
            build: {
                src: 'src/components/App.js',
                dest: '.build/js/index.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        extensions: ['.es6', '.jsx', '.js']
                    },
                    watch: true,
                    keepAlive: false,
                    transform: ['babelify', 'livereactload']
                }
            }
        },
        copy: {
            assets: {
                files: [
                    {cwd: 'src', expand: true, src: './assets/*', dest: '.build/'},
                    {cwd: 'src', expand: true, src: '*.html', dest: '.build/'}
                ]
            },
            bootstrap: {
                files: [
                    {cwd: 'node_modules', expand: true, src: './bootstrap/dist/**/bootstrap.min.css', dest: '.build/'},
                    {cwd: 'node_modules', expand: true, src: './bootstrap/dist/**/bootstrap.js', dest: '.build/'}
                ]
            },
            jQuery: {
                files: [
                    {cwd: 'node_modules', expand: true, src: './jquery/dist/**/jquery.min.js', dest: '.build/'}
                ]
            }
        },
        watch: {
            all: {
                files: ['src/**/*.js'],
                tasks: ['eslint', 'copy'],
                options: {
                    spawn: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.build'
                }
            }
        },

        clean: {
            all: ['.build/*']
        },

        karma: {
            production: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            development: {
                configFile: 'karma.conf.js',
                coverageReporter: {type: 'html'},
                autoWatch: true,
                singleRun: true
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('bundle', ['clean', 'browserify', 'copy']);
    grunt.registerTask('server', ['connect', 'monitoring', 'watch']);

    grunt.registerTask('build', ['bundle', 'server']);

    grunt.registerTask('default', ['eslint', 'build']);

    grunt.registerTask('test', ['karma:production']);

    grunt.registerTask('monitoring', function() {
        lrload.monitor('.build/js/index.js');
    });
};
