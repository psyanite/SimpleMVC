
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
        files: basePaths.css + "custom.css",
        libFiles: basePaths.lib + "**/*.css",
        destFile: "main.css",
        destMinFile: "main.min.css"
    },
    js: {
        files: basePaths.js + "*.js",
        libFiles: basePaths.lib + "**/*.js",
        destFile: basePaths.js + "main.min.js"
    },
    sass: {
        main: basePaths.sass + "/*.scss",
        partials: basePaths.sass + "**/*.scss",
        destFile: "custom.css",
        destMinFile: "custom.min.css"
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

gulp.task("build", sequence("clean", "compile", "min", "watch"));

/* Clean */
gulp.task("clean", ["clean:js", "clean:styles"]);

gulp.task("clean:js", function () {
    return del([paths.js.destFile]);
});

gulp.task("clean:styles", function () {
    return del([
        paths.sass.destFile,
        paths.sass.destMinFile,
        paths.css.destFile,
        paths.css.destMinFile,
    ]);
});



/* Minify */
gulp.task("min", ["min:js", "min:styles"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js.files, paths.js.libFiles])
        .pipe(concat(paths.js.destFile))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:styles", function () {
    return gulp.src([paths.css.files, paths.css.libFiles])
        .pipe(concat(paths.css.destFile))
        .pipe(cleancss())
        .pipe(gulp.dest("."));
});



/* Compile */
gulp.task("compile", ["compile:styles"]);

gulp.task('compile:styles', function () {
    return gulp.src([basePaths.sass + '/*.scss'])
      .pipe(compass({
          config_file: basePaths.config + '/compass-config.rb',
          css: basePaths.css,
          sass: basePaths.sass
      }))
      .pipe(vinylPaths(del))
      .pipe(rename(paths.sass.destFile))
      .pipe(gulp.dest(basePaths.css))
      .pipe(cleancss())
      .pipe(gulp.dest(basePaths.css))
      .pipe(rename(paths.sass.destMinFile))
      .pipe(gulp.dest(basePaths.css));
});



/* Watch */
gulp.task("watch", ["watch:js", "watch:styles"]);

gulp.task('watch:js', function () {
    return gulp.watch(paths.js.files, ['min:js']);
});

gulp.task('watch:styles', function () {
    return gulp.watch([paths.sass.main, paths.sass.partials], ['compile:styles']);
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
