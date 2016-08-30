'use strict';

// var gulp = require('gulp');

var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')(),
  del         = require('del'),
  // gulp-load-plugins will report "undefined" error unless you load gulp-sass manually.
  sass        = require('gulp-sass');

// var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var importOnce = require('node-sass-import-once'),
  path = require('path');

var options = {};

options.rootPath = {
  project     : __dirname + '/',
  theme       : __dirname + '/'
};

options.theme = {
  root  : options.rootPath.theme,
  css   : options.rootPath.theme + 'css/',
  sass  : options.rootPath.theme + 'sass/',
  js    : options.rootPath.theme + 'js/'
};

// Define the node-sass configuration. The includePaths is critical!
options.sass = {
  importer: importOnce,
  includePaths: [
    options.theme.sass,
    // options.rootPath.project + 'node_modules/breakpoint-sass/stylesheets',
    options.rootPath.project + 'node_modules/typey/stylesheets'
  ],
  outputStyle: 'expanded'
};

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    '> 1%',
    'ie 9'
  ]
};

// If your files are on a network share, you may want to turn on polling for
// Gulp watch. Since polling is less efficient, we disable polling by default.
options.gulpWatchOptions = {};
// options.gulpWatchOptions = {interval: 1000, mode: 'poll'};


// Lint Sass.
gulp.task('lint:sass', function() {
  return gulp.src(options.theme.sass + '**/*.scss')
    .pipe($.sassLint())
    .pipe($.sassLint.format());
});

// Clean CSS files.
gulp.task('clean:css', function() {
  return del([
      options.theme.css + '**/*.css',
      options.theme.css + '**/*.map'
    ], {force: true});
});

// ##########
// Build CSS.
// ##########
var sassFiles = [
  options.theme.sass + '**/*.scss',
  // Do not open Sass partials as they will be included as needed.
  '!' + options.theme.sass + '**/_*.scss'
];

gulp.task('sass', ['clean:css'], function() {
  return gulp.src(sassFiles)
  .pipe(sassGlob())
    .pipe($.sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css));
});


gulp.task('sass:production', ['clean:css'], function() {
  return gulp.src(sassFiles)
  .pipe(sassGlob())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.size({showFiles: true}))
    .pipe(gulp.dest(options.theme.css));
});

gulp.task('watch', ['watch:css']);

gulp.task('watch:css', ['sass'], function() {
  return gulp.watch(options.theme.sass + '**/*.scss', options.gulpWatchOptions, ['sass']);
});



// gulp.task('sass:prod', function () {
//   gulp.src('./sass/*.scss')
//     .pipe(sassGlob())
//     .pipe(sass({
//       includePaths: ['./bower_components/breakpoint-sass/stylesheets']
//     }).on('error', sass.logError))
//     .pipe(autoprefixer({
//        browsers: ['last 2 version']
//     }))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:dev', function () {
//   gulp.src('./sass/*.scss')
//     .pipe(sassGlob())
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       includePaths: ['./bower_components/breakpoint-sass/stylesheets']
//     }).on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ['last 2 version']
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass:dev']);
// });

gulp.task('default', ['watch']);
