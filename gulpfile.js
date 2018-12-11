var gulp = require('gulp');
// var require: gulp;
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var run = require('gulp-run-command').default;

gulp.task('hello', function () {
    // console.log('hello sagar');
    return gulp.src('./sass/main.scss') // Get source files with gulp.src
        .pipe(sass()) //send it to through gulp plugin using gulp sass
        .pipe(gulp.dest('./css'))
});

// task to minify css
gulp.task('minifycss', function () {
    return gulp.src('./css/**/*.css')
        .pipe(uglifycss({
            // "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy', run('xcopy  e:\\gulp-project\\dist  z:\\Migration-WAF\\SITE\\testinggulp /e /i /h /y'));

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('hello'));
    gulp.watch('./css/**/*.css', gulp.series('minifycss'));
    gulp.watch('./dist/**/*.css', gulp.series('copy'));
});