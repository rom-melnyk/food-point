var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var srcDir = './client/';
var compiledDir = './client/_compiled/';
var destDir = __dirname + '/static/';

var jsFilename = 'script.js';
var cssFilename = 'style.css';

module.exports = {
    entry: [
        srcDir + 'app.es',
        srcDir + 'style.scss'
    ],
    output: {
        path: compiledDir,
        filename: jsFilename,
        // chunkFilename: '[id].js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass?sourceMap') },
            { test: /\.json$/, loader: 'json-loader' },
            // { test: /\.png$/, loader: 'url?limit=120000' },
            // { test: /\.ttf(.*)?$/, loader: 'url?limit=60000' },
            // { test: /\.eot(.*)?$/, loader: 'url?limit=60000' },
            // { test: /\.svg(.*)?$/, loader: 'url?limit=60000' },
            // { test: /\.woff(.*)?$/, loader: 'url?limit=60000' },
            { test: /\.es?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    plugins: [
        new ExtractTextPlugin(cssFilename + ''),
        new CopyPlugin([
            { from: compiledDir + jsFilename + '*', to: destDir + 'js/[name].[ext]' },
            { from: compiledDir + cssFilename + '*', to: destDir + 'css/[name].[ext]'}
        ])
    ],
    debug: true,
    devtool: 'source-map'
};
