var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('nunjucks', function() {
    gulp.src('app/pages/**/*.+(html|nunjucks)')
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
        //.pipe(browserSync.reload({ stream: true }))
        //.pipe(browserSync.stream({ match: '**/*.css' }))
        ;
});

gulp.task('sync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('watch', ['sync'], function() {
    gulp.watch('app/**/*.+(html|nunjucks)', ['nunjucks']);

    gulp.watch('app/scss/*.scss', ['sass']);
    //gulp.watch('app/index.html', browserSync.reload);
    gulp.watch("dist/*.html", browserSync.reload);

    // Không được chứa link CSS sai
    //gulp.watch("app/css/*.css").on('change', browserSync.reload);
    //gulp.watch("dist/css/*.css").on('change', browserSync.stream);
});

gulp.task('default', ['watch']);
