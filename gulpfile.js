var gulp = require('gulp');
// var require: gulp;
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var run = require('gulp-run-command').default;
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// gulp.task('hello', function () {
//     // console.log('hello sagar');
//     return gulp.src('./sass/main.scss') // Get source files with gulp.src
//         .pipe(sass()) //send it to through gulp plugin using gulp sass
//         .pipe(gulp.dest('./css'))
// });

// // task to minify css
// gulp.task('minifycss', function () {
//     return gulp.src('./css/**/*.css')
//         .pipe(uglifycss({
//             "uglyComments": true
//         }))
//         .pipe(gulp.dest('./dist/css'))
// });

//task to create css map files
gulp.task('cssmaps', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./css'))
})

//task to reload the browser
gulp.task('serve', function () {
    browserSync.init({
        watch: true,
        // proxy: "192.168.100.119:8102/projects/LB-mumbait20/base.html"
        server: {
            baseDir: "e:\\gulp-project\\"
        }
    });
    gulp.watch('./sass/**/*.scss', gulp.series('cssmaps'));
    gulp.watch('./css/**/*.css', gulp.series('copy'));
    gulp.watch("./index.html").on('change', browserSync.reload);
});

// task to paste in another location
gulp.task('copy', run('xcopy  e:\\gulp-project\\css  z:\\Migration-WAF\\SITE\\testinggulp\\css /e /i /h /y'));

//specify the series of task
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('cssmaps'));
    // gulp.watch('./css/**/*.css', gulp.series('minifycss'));
    gulp.watch('./css/**/*.css', gulp.series('copy'));
});