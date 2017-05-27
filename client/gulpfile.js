const gulp = require('gulp');

const sass = require('gulp-sass');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');

const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const uglifyJs = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

const DIRS = {
    JsDev: './js',
    CssDev: './css',

    JsDeploy: '../server/js',
    CssDeploy: '../server/css'
};

let isProduction = false;

const BABEL_CONFIG = {
    presets: [
        [
            'env',
            {
                'targets': {
                    'browsers': [ 'last 2 versions', 'safari >= 7' ]
                }
            }
        ],
        'es2016',
        'es2017'
    ],
    plugins: [
        [
            'transform-react-jsx',
            { 'pragma': 'h' }
        ]
    ]
};


// -------------------- JS --------------------
gulp.task('js:cleanup', () => {
    del([
        `${DIRS.JsDeploy}/*.js*`,
        `!${DIRS.JsDeploy}`,
        `!${DIRS.JsDeploy}/.gitignore`,
    ]);
});

gulp.task('js', [ 'js:cleanup' ], () => {
    let flow = browserify({
            entries: [ `${DIRS.JsDev}/index.js` ],
            debug: !isProduction
        })
        .transform('babelify', BABEL_CONFIG)
        .bundle()
        .on('error', logJsError)
        .pipe(source(`${DIRS.JsDev}/index.js`, `${DIRS.JsDev}/`))
        .pipe(buffer())
        .pipe(rename(`script.js`));

    if (isProduction) {
        flow = flow
            .pipe(uglifyJs())
            .on('error', gutil.log);
    } else {
        flow = flow
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write(`./`));
    }

    flow.pipe(gulp.dest(`${DIRS.JsDeploy}/`));
});

gulp.task('js:watch', () => {
    gulp.watch([ `${DIRS.JsDev}/**` ], [ 'js' ]);
});


// -------------------- CSS --------------------
gulp.task('css:cleanup', () => {
    del([
        `${DIRS.CssDeploy}/*.css*`,
        `!${DIRS.CssDeploy}`,
        `!${DIRS.CssDeploy}/.gitignore`
    ]);
});

gulp.task('css', [ 'css:cleanup' ], () => {
    let flow = gulp
        .src(`${DIRS.CssDev}/index.scss`, { base: `${DIRS.CssDev}/` })
        .pipe(rename(`style.css`));

    if (!isProduction) {
        flow = flow.pipe(sourcemaps.init());
    }

    flow = flow.pipe(sass().on('error', sass.logError));

    if (!isProduction) {
        flow = flow.pipe(sourcemaps.write('./'));
    } else {
        flow = flow
            .pipe(cleanCss())
            .on('error', gutil.log);
    }

    flow.pipe(gulp.dest(`${DIRS.CssDeploy}/`));
});

gulp.task('css:watch', () => {
    gulp.watch(`${DIRS.CssDev}/**`, [ 'css' ]);
});


// -------------------- SERVICE --------------------
gulp.task('mark-as-prod', () => {
    isProduction = true;
});


// -------------------- helpers --------------------
function logJsError(err) {
    if (err.fileName) {
        // regular error
        gutil.log(
            gutil.colors.red(err.name),
            gutil.colors.yellow(err.fileName),
            `at ${err.lineNumber}:${(err.columnNumber || err.column)}`,
            err.description
        );
    } else {
        // browserify error
        gutil.log(`${err.name}: ${err.message}`);
    }

    this.emit('end'); // `this` is browserify instance
}


// -------------------- DEFAULT --------------------
gulp.task('dev', [ 'js', 'css', 'js:watch', 'css:watch' ]);
gulp.task('prod', [ 'mark-as-prod', 'js', 'css' ]);
