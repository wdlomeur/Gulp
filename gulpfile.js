const gulp = require('gulp');
const jshint = require('gulp-jshint');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const es = require('event-stream');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('clean', () => {
    return gulp.src('dist/**/*.*')
    .pipe(clean());
});

gulp.task('jshint', () => {
    return gulp.src(['lib/**/*.js', 'js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', () => {
    return es.merge([gulp.src(['lib/angular-animate.min.js', 'lib/angular.min.js']),
    gulp.src(['js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', () => {
    return gulp.src('view/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(gulp.dest('dist/view'));
});

gulp.task('cleanCSS', () => {
    return gulp.src(['css/*.css'])
    .pipe(cleanCSS())
    .pipe(concat('bootstrap.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', () => {
    return gulp.src('index-prod.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', 
    gulp.series('clean', gulp.parallel('uglify', 'htmlmin', 'cleanCSS', 'jshint', 'copy'))
);
