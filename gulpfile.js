const gulp = require('gulp');
const sass = require('gulp-sass');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');

const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');

gulp.task('css', () => gulp.src('./css-src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
);

gulp.task('js', () => {
    const b = browserify({
        entries: './js-src/app.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        // transform: [ babel ]
    });

    return b.bundle()
    .pipe(source('./js-src/app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('css:watch', () => {
    gulp.watch('./css-src/**/*.scss', ['css']);
});

gulp.task('js:watch', () => {
    gulp.watch(['./js-src/**/*.js', './version.json'], ['js']);
});

gulp.task('default', ['css', 'js', 'css:watch', 'js:watch']);

// TODO create tasks for production
