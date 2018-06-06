'use strict';

var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var config = require('./../config.js');
var build = require('./../utils/buildHelper.js');

// Output size of dist folder
gulp.task('minifyjs', false, function () {
  return gulp.src(config.buildSize.srcJs)
    .pipe(gulpif('*.js', gulpif(config.uglifyJs, uglify()))) // uglify JS
    .pipe(gulpif('*.js', gulpif(config.uglifyJs, rename({suffix: '.min'})))) // rename JS
    .pipe(gulpif('*.js', gulpif(config.uglifyJs, gulp.dest('dist/scripts')))) // save JS
});
