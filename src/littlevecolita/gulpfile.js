"use strict";

var cleancss = require("gulp-clean-css"),
    compass = require("gulp-compass"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    gulp = require("gulp"),
    path = require("path"),
    plumber = require("gulp-plumber"),
    rename = require('gulp-rename'),
    rimraf = require("rimraf"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};



// ===================================================
//  Paths
// ===================================================

paths.config = paths.webroot + "config";

paths.cssPath = paths.webroot + "css";

paths.sassPath = paths.webroot + "sass";
paths.mainSassFile = paths.sassPath + "/*.scss";
paths.otherSassFiles = paths.sassPath + "/**/*.scss";

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";



// ===================================================
//  Tasks
// ===================================================

gulp.task("default", ["clean.js", "clean:styles",
                      "min:js", "compile:styles",
                      "watch:js", "watch:styles"]);



gulp.task("clean", ["clean:js", "clean:styles"]);

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:styles", function (cb) {
    rimraf(paths.concatCssDest, cb);
});



gulp.task("min", ["min:js", "min:styles"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:styles", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});



gulp.task('compile:styles', function () {
    gulp.src([paths.sassPath + '/*.scss'])
      .pipe(plumber())
      .pipe(compass({
          config_file: paths.config + '/compass-config.rb',
          css: paths.cssPath,
          sass: paths.sassPath
      }))
      .pipe(sourcemaps.init())
      .pipe(cleancss())
      .pipe(sourcemaps.write())
      .pipe(rename("main.min.css"))
      .pipe(gulp.dest(paths.cssPath));
});



gulp.task('watch:js', function () {
    gulp.watch(paths.js, ['min:js']);
});

gulp.task('watch:styles', function () {
    gulp.watch([paths.mainSassFile, paths.otherSassFiles], ['compile:styles']);
});