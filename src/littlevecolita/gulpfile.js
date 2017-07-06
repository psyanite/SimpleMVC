
"use strict";

var cleancss   = require("gulp-clean-css"),
    compass    = require("gulp-compass"),
    concat     = require("gulp-concat"),
    del        = require("del"),
    filter     = require("gulp-filter"),
    gulp       = require("gulp"),
    path       = require("path"),
    rename     = require('gulp-rename'),
    sequence   = require('gulp-sequence'),
    sourcemaps = require("gulp-sourcemaps"),
    svgSprite  = require("gulp-svg-sprites"),
    uglify     = require("gulp-uglify"),
    vinylPaths = require("vinyl-paths");



// ===================================================
//  Paths
// ===================================================
var rootPath = "./wwwroot/";
var basePaths = {
    config: rootPath + "config/",
    css: rootPath + "css/",
    js: rootPath + "js/",
    lib: rootPath + "lib/",
    sass: rootPath + "sass/",
    sprite: rootPath + "sprite/"
};

var paths = {
    css: {
        destFile: basePaths.css + "main.css",
        destMinFile: basePaths.css + "main.min.css"
    },
    js: {
        customFiles: basePaths.js + "custom/*.js",
        destFile: basePaths.js + "main.js",
        destMinFile: basePaths.js + "main.min.js"
    },
    sass: {
        main: basePaths.sass + "/*.scss",
        partials: basePaths.sass + "**/*.scss",
        destFile: basePaths.css + "custom.css",
        destMinFile: basePaths.css + "custom.min.css"
    },
    sprite: {
        svgs: basePaths.sprite + "svgs/*.svg",
        scss: basePaths.sass + "base",
        svg: basePaths.sprite + "sprite.svg"
    }
};



// ===================================================
//  Tasks
// ===================================================

gulp.task("boot", sequence("clean", "compile"));
gulp.task("build", sequence("clean", "compile", "watch"));

/* Clean */
gulp.task("clean", ["clean:js", "clean:styles"]);

gulp.task("clean:js", function () {
    return del([
        paths.js.destFile,
        paths.js.destMinFile
    ]);
});

gulp.task("clean:styles", function () {
    return del([
        paths.sass.destFile,
        paths.sass.destMinFile,
        paths.css.destFile,
        paths.css.destMinFile,
    ]);
});



/* Compile */
gulp.task("compile", sequence("compile:sass", "compile:css", "compile:js"));

gulp.task('compile:sass', function () {
    return gulp.src([basePaths.sass + '/*.scss'])
      .pipe(compass({
          config_file: basePaths.config + '/compass-config.rb',
          css: basePaths.css,
          sass: basePaths.sass
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(paths.sass.destFile))
      .pipe(gulp.dest("."))
      .pipe(cleancss())
      .pipe(rename(paths.sass.destMinFile))
      .pipe(gulp.dest("."));
});

gulp.task("compile:css", function () {
    var files = [
        basePaths.lib + "one-page-scroll/*.css",
        paths.sass.destFile
    ];
    return gulp.src(files)
        .pipe(concat(paths.css.destFile))
        .pipe(gulp.dest("."))
        .pipe(cleancss())
        .pipe(rename(paths.css.destMinFile))
        .pipe(gulp.dest("."));
});

gulp.task("compile:js", function () {
    var files = [
        basePaths.lib + "one-page-scroll/*.min.js",
        basePaths.lib + "owl-carousel/*.min.js",
        basePaths.lib + "sergep/*.js",
        paths.js.customFiles
    ];
    return gulp.src(files)
        .pipe(concat(paths.js.destFile))
        .pipe(gulp.dest("."))
        .pipe(uglify())
        .pipe(rename(paths.js.destMinFile))
        .pipe(gulp.dest("."));
});



/* Watch */
gulp.task("watch", ["watch:js", "watch:styles"]);

gulp.task('watch:js', function () {
    return gulp.watch(paths.js.files, ['min:js']);
});

gulp.task('watch:styles', function () {
    return gulp.watch([paths.sass.main, paths.sass.partials], ['compile:sass']);
});



/* SVG Sprite */
gulp.task('sprite', function () {
    return gulp.src(paths.sprite.svgs, { base: '.' })
        .pipe(svgSprite({
            templates: { scss: true },
            mode: "symbols"
        }))
        .pipe(gulp.dest(basePaths.sprite))
});
