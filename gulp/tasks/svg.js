'use strict';

var config = require('./../config.js');
var gulp = require('gulp-help')(require('gulp'));
var svgSprite = require("gulp-svg-sprite");

gulp.task('sprites', function () {
    return gulp.src(config.sprites.src)
        .pipe(svgSprite({
            shape: {
                spacing: {
                    padding: 10
                }
            },
            mode: {
                css: {
                    dest: "./",
                    layout: "horizontal",
                    sprite: config.sprites.svg,
                    bust: false,
                    render: {
                        scss: {
                            dest: "styles/helpers/_sprite.scss",
                            template: "app/styles/tpl/sprite-template.scss"
                        }
                    }
                }
            },
            variables: {
                mapname: "icons"
            }
        }))
        .pipe(gulp.dest(config.sprites.dest));
});
