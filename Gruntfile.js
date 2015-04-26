
module.exports = function(grunt) {

    /****************************************
     *
     * PROJECT CONFIGURATION
     *
     ****************************************/

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        opt: {
            header: '/*! <%= pkg.title %> Package - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            footer: '',
            extlibs: ['RubikHelper'],
            libs: {
                panelui: 'dependencies/PanelUI/public/panelui-latest.min.js'
            },
            nl: grunt.util.linefeed
        },

        /********************
         * CONCAT FILES
         ********************/
        concat: {
            options: {
                separator: grunt.util.linefeed
            },

            packages: {
                src: [
                    'src/elements/RHAnalyze.js',
                    'src/elements/RHCubeColors.js',
                    'src/elements/RHCubeSetup.js',
                    'src/elements/RHExplainList.js',
                    'src/elements/RHExplainPriority.js',
                    'src/elements/RHFaceButtons.js',
                    'src/elements/RHGroupButtons.js',
                    'src/elements/RHPieceButton.js',
                    'src/elements/RHHighlightList.js',
                    'src/elements/RHHighlightPieces.js',
                    'src/elements/RHMovesList.js',
                    'src/elements/RHReplay.js',
                    'src/elements/RHSequenceInput.js',

                    'src/panels/PanelSequenceToMoves.js',
                    'src/panels/PanelMoves.js',
                    'src/panels/PanelSolve.js',
                    'src/panels/PanelCubeSetup.js',
                    'src/panels/PanelExplain.js',
                    'src/panels/PanelHighlights.js',

                    'src/RHMainUI.js'
                ],
                dest: 'target/temp/packages.js'
            },

            main: {
                options: {
                    banner: '<%= opt.header %><%= opt.nl %>'+
                    'var <%= pkg.title %> = (function(<%= opt.extlibs.join(",") %>){' + '<%= opt.nl %>'+
                    'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
                    footer: '<%= opt.nl %>'+
                    'return <%= pkg.title %>Package;}(<%= opt.extlibs.join(",") %>));'
                },
                src: [
                    '<%= opt.libs.panelui %>',
                    'target/temp/packages.js',
                    'target/<%= pkg.title %>Package.js'
                ],
                dest: 'target/<%= pkg.name %>-<%= pkg.version %>.js'
            }

        },

        /********************
         * MINIFY FILES
         ********************/
        uglify: {

            main: {
                options: { banner: '<%= opt.header %><%= opt.nl %>' },
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            }

        },

        /********************
         * CLEAN
         ********************/
        clean: {

            target : ['target'],
            build  : ['build'],
            deploy : ['public/<%= pkg.version %>'],
            all    : ['target','build','public/<%= pkg.version %>']

        },

        /********************
         * COPY
         ********************/
        copy: {

            main: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['target/<%= pkg.name %>*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },

            deploy: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        opt: {from:'<%= pkg.name %>',to:'<%= pkg.name %>-latest'},
                        dest: 'public/', src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        rename: function(dest, src) {return dest + src.replace(/[0-9]/g,'').replace(/-\.\./,'').replace(this.opt.from,this.opt.to);}
                    },
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        dest: 'public/<%= pkg.version %>/'
                    }
                ]
            }

        }

    });

    /****************************************
     *
     * LOAD PLUGINS
     *
     ****************************************/

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /****************************************
     *
     * REGISTER TASKS
     *
     ****************************************/

    // External tasks
    grunt.loadTasks('tasks');

    // Full tasks
    grunt.registerTask('build', ['clean:target', 'create_package', 'concat:packages', 'concat:main', 'uglify:main', 'copy:main', 'clean:target']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'copy:deploy']);

    // Default task
    grunt.registerTask('default', ['build']);

};
