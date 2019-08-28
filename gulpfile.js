var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('test',function() {
    console.log('Hello World');
})

gulp.task('copy',function() {
	return gulp.src('app/script/**/*.js')
		.pipe(gulp.dest('dist'));
})

gulp.task('uglify',function() {
	return gulp.src('app/script/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})

gulp.task('concat',function() {
	return gulp.src('app/script/**/*.js')
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})