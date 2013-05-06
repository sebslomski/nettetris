module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        files: {
            lib: [
                'app/js/lib/jquery.js',
                'app/js/lib/lodash.underscore.js',
                'app/js/lib/backbone.js',
                'app/js/lib/handlebars.runtime.js',
                'app/js/lib/easeljs.js'
            ],
            src: [
                'app/js/src/App.js',
                'app/js/src/**/*.js'
            ],
            less: 'app/css/main.less',
            templates: 'app/templates/**/*.html',
            index: 'app/index.html'
        },


        concat: {
            options: {
                separator: ';',

                banner: '/*!\n* <%= pkg.name %> by Micheala Santl and Sebastian Slomski - v<%= pkg.version %>\n' +
                        '* Created: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '* Copyright (c) <%= grunt.template.today("yyyy") %> Micheala Santl and Sebastian Slomski\n*/'

            },
            dist: {
                src: ['<%= files.lib %>', 'dist/templates.js', '<%= files.src %>'],
                dest: 'dist/static/build.js'
            }
        },


        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    wrapped: true,
                    processName: function(filePath) {
                        return filePath.replace(/^app\//, '');
                    }
                },
                files: {
                    'dist/templates.js': '<%= files.templates %>'
                }
            }
        },


        less: {
            development: {
                files: {
                    'dist/static/build.css': '<%= files.less %>'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/static/build.css': '<%= files.less %>'
                }
            }
        },


        jshint: {
            options: {
                browser: true,
                devel: true,
                curly: true,
                quotmark: 'single',
                strict: true,
                globals: {
                    self: true,
                    jQuery: true,
                    '$': true,
                    CL: true,
                    Backbone: true,
                    moment: true,
                    Handlebars: true,
                    Modernizr: true,
                    '_': true
                }
            },
            files: {
                src: ['grunt.js', '<%= files.src %>']
            }
        },


        watch: {
            files: ['<%= files.lib %>', '<%= files.src %>', '<%= files.templates %>'],
            tasks: 'default'
        },


        clean: {
            build: ['dist']
        }
    });



    grunt.registerTask('compile-index', function(target) {
        /*
         * Compiles the index template. Adds all the variables in the settings file
         * to the App object
         * */
        var template = grunt.file.read(grunt.config.get('files').index);
        var data = {
            data: {
                title: 'Nettetris'
            },
            now: +new Date()
        };
        template = grunt.template.process(template, {data: data});
        grunt.file.write('dist/index.html', template);
    });


    grunt.registerTask('default', ['clean', 'handlebars', 'concat', 'less:development', 'compile-index']);
};
