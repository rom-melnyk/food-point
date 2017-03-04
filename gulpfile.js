const gulp = require('gulp');
const sass = require('gulp-sass');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');

const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');

const PATH = {
    JS: {
        sourceDir: './js-src/',
        sourceName: 'app.js',
        compiledName: 'app-compiled.js',
        destDir: './',
        destName: 'script.js'
    },
    CSS: {
        sourceDir: './css-src/',
        sourceName: 'style.scss',
        destDir: './',
        destName: 'style.css'
    }
};

// ---------------------- SCSS --> CSS ----------------------
gulp.task('css:cleanup', () => del([`${PATH.CSS.destDir}${PATH.CSS.destName}*`]));

gulp.task('css', ['css:cleanup'], () => gulp.src(`${PATH.CSS.sourceDir}**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(`${PATH.CSS.destDir}`))
    .pipe(gulp.dest(`${PATH.CSS.destDir}`))
);

gulp.task('css:watch', () => {
    gulp.watch(`${PATH.CSS.sourceDir}**/*.scss`, ['css']);
});

// ---------------------- ES6 --> JS ----------------------
gulp.task('js:cleanup', () => del([`${PATH.JS.sourceDir}${PATH.JS.compiledName}`, `${PATH.JS.destDir}${PATH.JS.destName}*`]));

gulp.task('js:browserify', ['js:cleanup'], () => browserify(
    [
        `${PATH.JS.sourceDir}${PATH.JS.sourceName}`,
        `!${PATH.JS.sourceDir}${PATH.JS.compiledName}`,
        './version.json'
    ]).bundle()
    .pipe(source(`${PATH.JS.sourceDir}${PATH.JS.sourceName}`))
    .pipe(buffer())
    .pipe(rename(`${PATH.JS.compiledName}`))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write(`${PATH.JS.sourceDir}`))
    .pipe(gulp.dest(`${PATH.JS.sourceDir}`))
);

gulp.task('js:babelify', ['js:browserify'], () => gulp.src([`${PATH.JS.sourceDir}${PATH.JS.compiledName}`])
    .pipe(babel())
    // .pipe(uglify())
    .pipe(rename(`${PATH.JS.destName}`))
    .pipe(gulp.dest(`${PATH.JS.destDir}`))
);

gulp.task('js', ['js:babelify']); // shorthand

gulp.task('js:watch', () => {
    gulp.watch([`${PATH.JS.sourceDir}**/*.js`, './version.json'], ['js']);
});

// ---------------------- default task ----------------------
gulp.task('default', ['css', 'js', 'css:watch', 'js:watch']);

// TODO create tasks for production
