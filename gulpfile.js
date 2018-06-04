const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const myth = require('gulp-myth');
const sourcemaps = require('gulp-sourcemaps');



//  server
gulp.task('server', function(){
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "dist"
        }
    });
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});

/* ------------ Jade compile ------------- */
gulp.task('templates:compile', function() {
    return gulp.src('source/template/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
});

/* ------------ Styles compile ------------- */

gulp.task('styles:compile', function() {
    return gulp.src('source/css/main.styl')
        .pipe(stylus())
        .on('error', console.log)
        .pipe(myth())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css', function() {
    return gulp.src('source/css/*.css')
        .pipe(stylus())
        .pipe(gulp.dest('dist/css'));
});


/* ------------ Sprite ------------- */
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.stylus'
    }));
    spriteData.img.pipe(gulp.dest('dist/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});


/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('dist', cb);
});


/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function () {
    return gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:img', function () {
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('dist/images'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:img','copy:fonts'));

/* ------------ Watchers ------------- */
gulp.task('watch',function(){
    gulp.watch('source/css/**/*.styl',gulp.series('styles:compile'));
    gulp.watch('source/css/**/*.css',gulp.series('css'));
    gulp.watch('source/template/**/*.jade',gulp.series('templates:compile'));
    gulp.watch('source/js/**/*.js',gulp.series('compress'));

});

/* ------------- Compress JS ---------*/
gulp.task('compress', function() {
    return gulp.src('source/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'compress', 'sprite', 'copy','css'),
    gulp.parallel('watch', 'server')
    )
);




