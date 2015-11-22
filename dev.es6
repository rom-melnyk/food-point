const watch = require('watch');
const config = require('./package.json').config;
const fs = require('fs');
const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('node-sass');

const Dev = {
    start () {
        watch.watchTree(`${config.src.dir}`, function (file, curr, prev) {
            if (typeof file === 'object' && prev === null && curr === null) {
                // Finished walking the tree
            } else {
                if (/\.es6?$/.test(file)) {
                    console.info(`>>> Got ${file}`);
                    _transpileEs();
                } else if (/\.scss$/.test(file)) {
                    console.info(`>>> Got ${file}`);
                    _compileScss();
                }
            }
        });
    },

    force () {
        _transpileEs();
        _compileScss();
    },

    stop () {
        watch.unwatchTree(`${config.src.dir}`);
    }
};

module.exports = Dev;

function _transpileEs () {
    const jsFileName = `${config.output.dir}/${config.output.js}`;
    const writeStream = fs.createWriteStream(jsFileName);
    writeStream.on('error', (err) => {
        console.error(`\t${err}\n`);
    });
    writeStream.on('finish', () => {
        console.info(`<<< Wrote ${jsFileName}\n`);
    });

    browserify(`${config.src.dir}/${config.src.es}`, { debug: true })
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .on('error', (err) => {
            console.error(`\t${err.message}\n`);
        })
        .pipe(writeStream);
}

function _compileScss () {
    sass.render({
        file: `${config.src.dir}/${config.src.scss}`,
        outputStyle: 'expanded',
        sourceMapEmbed: true
    }, (err, result) => {
        if (err) {
            console.error(`\t${err.message}\n`);
        } else {
            const cssFileName = `${config.output.dir}/${config.output.css}`;
            fs.writeFile(cssFileName, result.css, (err) => {
                if (!err) {
                    console.info(`<<< Wrote ${cssFileName}\n`);
                } else {
                    console.error(`\tError writing ${cssFileName}\n`);
                }
            });
        }
    });
}
