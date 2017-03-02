const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('css', () => gulp.src('./css-src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./style.css'))
);

gulp.task('js', () => gulp.src('./js-src/app.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./script.js'))
);

gulp.task('css:watch', () => {
    gulp.watch('./css-src/**/*.scss', ['css']);
});

gulp.task('js:watch', () => {
    gulp.watch(['./js-src/**/*.js', './version.json'], ['js']);
});

gulp.task('default', ['css', 'js', 'css:watch', 'js:watch']);

// TODO create tasks for production
