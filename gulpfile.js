const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('css', () => gulp.src('./css-src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'))
);

gulp.task('js', () => {
    console.log('JS compiler here');
});

gulp.task('css:watch', () => {
    gulp.watch('./css-src/**/*.scss', ['css']);
});

gulp.task('default', ['css:watch', 'js']);
