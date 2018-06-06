'use strict';

var gulp = require('gulp-help')(require('gulp'));

var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
var csscomb = require('gulp-csscomb');
var sassGlob = require('gulp-sass-glob');
var gcmq = require('gulp-group-css-media-queries');
var gulpif = require('gulp-if');

var autoprefixer = require('autoprefixer');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');

// Complie scss using libsass

gulp.task('styles-serve', 'Compile Sass to CSS', function () {
  return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(config.styles.sassCfg))
    .on('error', handleError)
    .pipe(postcss([
      autoprefixer(config.styles.autoprefixerCfg)
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true}));
});

gulp.task('styles-dist', 'Compile Sass to CSS', function () {
  return gulp.src(config.styles.src)
    .pipe(sassGlob())
    .pipe(sass(config.styles.sassCfg))
    .on('error', handleError)
    .pipe(postcss([
      autoprefixer(config.styles.autoprefixerCfg)
    ]))
    .pipe(gulpif(config.optimizeCss, csscomb()))
    // .pipe(gcmq())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true}));
});
