'use strict';
const watch = require('watch');
const config = require('./package.json').config;

const fs = require('fs');

const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('node-sass');

let isInitialized = false;

let io = null;
let isSocketConnected = false;
let socketEventMessages = [];

const Dev = {
    init (condition) {
        if (typeof condition === 'object' && condition.constructor === RegExp) {
            isInitialized = process.argv.filter(v => condition.test(v)).length > 0;
        } else if (typeof condition === 'string') {
            isInitialized = process.argv.filter(v => v === condition).length > 0;
        } else if (typeof condition === 'function') {
            isInitialized = !!condition();
        }

        if (isInitialized) {
            console.info('DEV mode ON; watching *.es6 and *.scss\n');
        }
    },

    watch (app, server) {
        if (!isInitialized) {
            return;
        }

        watch.watchTree(`${config.src.dir}`, (file, curr, prev) => {
            if (typeof file === 'object' && prev === null && curr === null) {
                // Finished walking the tree
            } else {
                if (/\.es6?$/.test(file)) {
                    console.info(`>>> Got ${file}`);
                    _transpileEs(file);
                } else if (/\.scss$/.test(file)) {
                    console.info(`>>> Got ${file}`);
                    _compileScss(file);
                } if (/\.mustache$/.test(file)) {
                    console.info(`>>> Got ${file}`);
                    _emitSocketEvent(file);
                }
            }
        });

        app.get('/auto-reload.js', (req, res) => {
            res.set('Content-Type', 'application/javascript');
            res.status(200).send(_generateAutoReloadJs());
            res.end();
        });

        _startSocket(server);
        _transpileEs('*');
        _compileScss('*');
    },

    unwatch () {
        watch.unwatchTree(`${config.src.dir}`);
    }
};

module.exports = Dev;

function _startSocket (server) {
    io = require('socket.io')(server);

    io.on('connection', (socket) => {
        isSocketConnected = true;
        _emitSocketEvent('connect');
        socket.on('disconnect', () => {});
    });
}

function _generateAutoReloadJs () {
    return `(function () {
    var script = document.createElement('script');
    script.onload = function () {
        var socket = io();
        socket.on('update', function (message) {
            console.log(' [ LiveReload ] Got "' + message + '"');
            if (/\\.css$/.test(message)) {
                console.log(' [ LiveReload ] Updating the CSS');
                Array.prototype.slice.call(
                    document.querySelectorAll('link[href*=\\\\.css]')
                ).forEach(function (link) {
                    var href = /.*\\.css/.exec(link.href);
                    href = href[0];
                    link.href = href + '?' + Date.now();
                });
            }
            if (/\\.js$/.test(message) || /\\.mustache$/.test(message)) {
                console.log(' [ LiveReload ] Reloading...');
                window.location.reload(true);
            }
        });
    };
    document.head.appendChild(script);
    script.src = '/socket.io/socket.io.js';
})();`;
}

/**
 * Do `browserify` job
 * @param {String} es6FileName
 * @private
 */
function _transpileEs (es6FileName) {
    const jsFileName = `${config.output.dir}/${config.output.js}`;
    const writeStream = fs.createWriteStream(jsFileName);

    writeStream.on('error', (err) => {
        console.error(`\t${err}`);
    });
    writeStream.on('finish', () => {
        console.info(`<<< Wrote ${jsFileName}; emitting "update" event`);
        _emitSocketEvent(jsFileName);
    });

    browserify(`${config.src.dir}/${config.src.es}`, { debug: true })
        .transform(babelify, {presets: ['es2015', 'react']})
        //.transform('brfs')
        .bundle()
        .on('error', (err) => {
            console.error(`\t${err.message}`);
        })
        .pipe(writeStream);
}

/**
 * Do `node-sass` job
 * @param {String} scssFileName
 * @private
 */
function _compileScss (scssFileName) {
    sass.render({
        file: `${config.src.dir}/${config.src.scss}`,
        outputStyle: 'expanded',
        sourceMapEmbed: true
    }, (err, result) => {
        if (err) {
            console.error(`\t${err.message}`);
        } else {
            const cssFileName = `${config.output.dir}/${config.output.css}`;
            fs.writeFile(cssFileName, result.css, (err) => {
                if (!err) {
                    console.info(`<<< Wrote ${cssFileName}; emitting "update" event`);
                    _emitSocketEvent(cssFileName);
                } else {
                    console.error(`\tError writing ${cssFileName}`);
                }
            });
        }
    });
}

function _emitSocketEvent (message) {
    if (!io) {
        console.error(' [LiveReload]: Not initialized');
        return;
    }

    if (isSocketConnected) {
        if (socketEventMessages.length === 0) {
            io.emit('update', message);
        } else {
            do {
                let _msg = socketEventMessages.shift();
                if (_msg !== 'connect') {
                    io.emit('update', _msg);
                }
            } while (socketEventMessages.length > 0)
        }
    } else {
        socketEventMessages.push(message);
    }
}
