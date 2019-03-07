const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');


var nunjucksPageFiles = 'app/pages/**/*.+(html|nunjucks)';
var nunjucksAllFiles = 'app/**/*.+(html|nunjucks)';
var sassFiles = 'app/scss/*.scss';



gulp.task('nunjucks', function() {
    gulp.src(nunjucksPageFiles)
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    gulp.src(sassFiles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('sync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('watch', ['sync'], function() {
    gulp.watch(nunjucksAllFiles, ['nunjucks']);
    gulp.watch(sassFiles, ['sass']);
    gulp.watch("dist/*.html", browserSync.reload);

    // Không được chứa link CSS sai
    //gulp.watch("app/css/*.css").on('change', browserSync.reload);
    //gulp.watch("dist/css/*.css").on('change', browserSync.stream);
});



gulp.task('default', ['watch']);

