'use strict';

var gulp = require('gulp-help')(require('gulp'));
var uncss = require('gulp-uncss');
var gulpif = require('gulp-if');

var config = require('./../config.js');
var build = require('./../utils/buildHelper.js');

// Output size of dist folder
gulp.task('uncss', false, function () {
  return gulp.src(config.buildSize.srcCss)
    .pipe(gulpif(config.optimizeCss, uncss({ html: ['dist/*.html']})))
    .pipe(gulpif(config.optimizeCss, gulp.dest('dist/styles/pure-css')));
});
