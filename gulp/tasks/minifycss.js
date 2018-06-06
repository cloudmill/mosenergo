'use strict';

var gulp = require('gulp-help')(require('gulp'));
var minifyCss = require('gulp-clean-css');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');

var config = require('./../config.js');
var build = require('./../utils/buildHelper.js');

// Output size of dist folder
gulp.task('minifycss', false, function () {
  return gulp.src(config.buildSize.srcCss)
    .pipe(gulpif('*.css', gulpif(config.minifyCss, minifyCss()))) // minify CSS
    .pipe(gulpif('*.css', gulpif(config.minifyCss, rename({suffix: '.min'})))) // rename CSS
    .pipe(gulpif('*.css', gulpif(config.minifyCss, gulp.dest('dist/styles')))) // save CSS
});
