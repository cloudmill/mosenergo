'use strict';

var gulp = require('gulp-help')(require('gulp'));
var pug = require('gulp-pug');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');

var config = require('./../config.js');
var handleError = require('./../utils/handleError.js');
var build = require('./../utils/buildHelper.js');

// Compile pug to html

gulp.task('templates', 'Compile templates', ['templates:prepareData', 'useref'], function() {
  var src = build.isBuild() ? config.templates.srcBuild : config.templates.src;
  var dest = build.isBuild() ? config.templates.destBuild : config.templates.dest;

  return gulp.src(src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(config.templatesData.dataPath));
    }))
    .pipe(pug(config.templates.cfg))
    .pipe(gulp.dest(dest));

});

// Concat *.json file to single data.json

gulp.task('templates:prepareData', 'Merge views data', function() {
  return gulp.src(config.templatesData.src)
    .pipe(extend(config.templatesData.dataName))
    .pipe(gulp.dest(config.templatesData.dest));
});

// Bundle css and js based on build tags in pug templates

gulp.task('useref', 'Bundle CSS and JS based on build tags and copy to `dist/` folder', function () {
  // run useref only in build
  if (build.isBuild()) {
    var assets = useref.assets(config.useref.assetsCfg);

    var pugFilesOnly = filter(['**/*.pug'], {restore: true});
    var excludePug = filter(['**','!**/*.pug']);

    return gulp.src(config.useref.src)
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(pugFilesOnly)
      .pipe(gulp.dest(config.useref.destPug))
      .pipe(pugFilesOnly.restore)
      .pipe(excludePug)
      .pipe(gulp.dest(config.useref.dest))
  } else {
    return;
  }
});
