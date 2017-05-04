// ////////////////////////////////////////////////
// CONFIG
// ////////////////////////////////////////////////

var config = {
	jsConcat: [
		'./app/js/main.js'
	],
	buildRemove:[
		'build/jade',
		'build/js/!(*.min.js)',
		'build/bower.json',
		'build/**/*.psd',
		'build/img/favicon.png',
		'build/bower_components/',
		'build/maps/',
		'build/scss/'
	]
};


// ////////////////////////////////////////////////
// Required Tasks
// ////////////////////////////////////////////////

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');


// ////////////////////////////////////////////////
// Log Errors
// ////////////////////////////////////////////////

function errorlog(err){
	console.log(err.message);
	this.emit('end');
}


// ////////////////////////////////////////////////
// Scripts Tasks
// ////////////////////////////////////////////////

gulp.task('scripts', function() {
	return gulp.src(config.jsConcat)
	.pipe(sourcemaps.init())
	.pipe(concat('temp.js'))
	.pipe(uglify())
	.on('error', errorlog)
	.pipe(rename('scripts.min.js'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('./app/js/'))
	.pipe(reload({ stream: true }));
});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('style', function() {
	gulp.src('app/css/style.css')
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('app/css'))
	.pipe(reload({ stream: true }));
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('jade', function() {
	gulp.src('app/jade/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app/'))
	.pipe(reload({ stream: true }));
});


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: "./app/"
		}
	});
});

gulp.task('build:serve', function() {
	browserSync({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task ('watch', function(){
	gulp.watch('app/css/style.css', ['style']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/**/*.jade', ['jade']);
});


// ////////////////////////////////////////////////
// Distribution Tasks
// ////////////////////////////////////////////////

gulp.task('build:clean', function (cb) {
	del([
		'build/**'
	], cb);
});

gulp.task('build:copy', ['build:clean'], function(){
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

gulp.task('build:remove', ['build:copy'], function (cb) {
	del(config.buildRemove, cb);
});

gulp.task('build', ['build:remove']);


// ////////////////////////////////////////////////
// Main Tasks
// ////////////////////////////////////////////////

gulp.task('compile', ['scripts', 'style', 'jade', 'build']);

gulp.task('default', ['scripts', 'style', 'jade', 'serve', 'watch']);
