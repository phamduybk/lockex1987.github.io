// npm install --save-dev gulp gulp-ruby-sass
const gulp = require('gulp');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const sass = require('gulp-ruby-sass');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');






// Paths
var lessFiles = 'app/less/*.less';
var jsFiles = 'app/js/*.js';
var sassFiles = 'app/scss/**/*.scss';
var imageFiles = 'app/images/*';



function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}



// Tasks
gulp.task('less', function() {
	gulp.src(lessFiles)
            .pipe(plumber())
			.pipe(less({ compress: true }))
			.pipe(gulp.dest('dist/css'));
});

gulp.task('sass', function() {
    gulp.src(sassFiles)
            .pipe(sass({ style: 'compressed' }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify', function() {
    gulp.src(jsFiles)
            .pipe(uglify())
            .on('error', errorLog)
            .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	gulp.watch(lessFiles, ['less']);
	gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles, ['uglify']);
});

gulp.task('sync', function() {
	var files = [
		'dist/*.html',
		'dist/css/*.css',
		'dist/js/*.js'
	];
	var options = {
		server: {
			baseDir: '.'
		}
	};
	browserSync.init(files, options);
});

gulp.task('imagemin', () => {
    gulp.src(imageFiles)
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'));
});



// DEFAULT
/*
gulp.task('default', function() {
  console.log('Hello Gulp');
});
*/

gulp.task('default', ['sync', 'less', 'watch']);

