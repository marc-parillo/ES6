
var gulp = require('gulp');
var watchify = require('watchify'); //
var browserify = require('browserify'); //
var source = require('vinyl-source-stream'); //
var buffer = require('vinyl-buffer'); //
var sourcemaps = require('gulp-sourcemaps'); //
var rename = require('gulp-rename'); //
var babelify = require('babelify'); //
var uglify = require('gulp-uglify'); //
var eslint = require('gulp-eslint'); //
var connect = require('gulp-connect'); //
var sass = require('gulp-sass'); //
var jasmine = require('gulp-jasmine'); //
//var jasmine = require('gulp-jasmine-browser'); //


var exit = require('gulp-exit');
var concat = require('gulp-concat');

gulp.task('serve', function () {
  connect.server({
    port: 1334,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
});

gulp.task('js', function () {
  return browserify({entries: './src/js/app.js', extensions: ['.js'], debug: true, standalone: 'MyLibrary'})
  .transform('babelify', {presets: ['es2015'], "plugins": ["transform-react-jsx"]})
  .bundle()
  .pipe(source('app.min.js'))
  .pipe(buffer())
  //.pipe(uglify())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
  .pipe(eslint({
    config: '.eslintrc'
  }))
  .pipe(eslint.format());
});

gulp.task('test', function () {
  return gulp.src('spec/*.js')
  .pipe(jasmine());
});

//gulp.task('test', function () {
//  return gulp.src(['./src/js/**/*.js','./spec/*.js'])
//  .pipe(jasmine.specRunner())
//  .pipe(jasmine.server({port:1335}));
//});


gulp.task('sass', function () {
  return gulp.src('src/styles/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/styles/'));
});

gulp.task('default', ['sass', 'js', 'serve', 'watch']);
gulp.task('build', ['sass', 'js']);
