// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({
    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON("package.json"),
    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require("jshint-stylish"), // use jshint-stylish to make our errors look and read good
      },
      // when this task is run, lint the Gruntfile and all js files in src
      build: ["Gruntfile.js", "src/js/magic.js"],
    },
    // compile Js ------------------------------------------------------------
    uglify: {
      my_target: {
        files: {
          "dist/js/jquery.min.js": ["src/js/jquery.js"],
          "dist/js/plugins.min.js": ["src/js/lib/custom-select.js"],
          "dist/js/index.min.js": ["src/js/index.js"],
        },
      },
    },
    // compile less stylesheets to css -----------------------------------------
    less: {
      development: {
        files: {
          "dist/css/omnie.css": "src/less/omnie.less",
          "dist/css/home.css": "src/less/omnie/pages/home/_home.less",
          "dist/css/aboutUs.css": "src/less/omnie/pages/aboutUs/_aboutUs.less",
          "dist/css/omnieLife.css":
            "src/less/omnie/pages/omnieLife/_omnieLife.less",
          "dist/css/technology.css":
            "src/less/omnie/pages/technology/_technology.less",
          "dist/css/services.css":
            "src/less/omnie/pages/technology/_services.less",
        },
        options: {
          compress: false,
          cleancss: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: "dist/css/omnie.css.map",
          sourceMapBasepath: "dist/css/",
        },
      },
    },
    // optimize images -----------------------------------------
    imagemin: {
      dynamic: {
        options: {
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: "src/images",
            src: ["**/*.{png,jpg,gif}"],
            dest: "dist/images/",
          },
        ],
      },
    },
    // assemble
    assemble: {
      options: {
        flatten: true,
        prettify: {
          indent: 2,
          condense: true,
          newlines: true,
        },
        assets: "dist/",
        partials: "components/**/*.hbs",
      },
      home: {
        files: { "index.html": ["components/home/index.hbs"] },
      },
      aboutUs: {
        files: { "about-us.html": ["components/aboutUs/aboutUs.hbs"] },
      },
      omnieLife: {
        files: { "omnie-life.html": ["components/omnieLife/omnieLife.hbs"] },
      },
      technology: {
        files: { "technology.html": ["components/technology/technology.hbs"] },
      },
      webInterface: {
        files: {
          "web-interface.html": ["components/web-interface/web-interface.hbs"],
        },
      },
    },
    // Before creating new files, remove files from previous build.
    clean: ["*.html"],
    // configure watch to auto update ----------------
    watch: {
      design: {
        files: ["dist/**/.css", "src/**/*.less"],
        tasks: ["less"],
        options: {
          nospawn: true,
        },
      },
      // for scripts, run jshint and uglify
      scripts: {
        files: "src/**/*.js",
        tasks: ["jshint", "uglify"],
      },
      HTML: {
        files: ["components/**/*.hbs"],
        tasks: ["assemble"],
      },
    },
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-assemble");
  grunt.loadNpmTasks("grunt-contrib-clean");
  // grunt.registerTask('default', ['clean', 'assemble', 'less', 'watch', 'uglify', 'imagemin']);
  grunt.registerTask("default", [
    "uglify",
    "less",
    "imagemin",
    "clean",
    "assemble",
    "watch",
  ]);
};
