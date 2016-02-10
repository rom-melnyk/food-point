module.exports = {
    entry: ['./src/app.es6'],
    output: {
        path: __dirname + '/static/js',
        filename: 'script.js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loaders: ['style', 'css', 'sass?sourceMap', 'url'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.png$/, loader: 'url?limit=120000' },
            { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    debug: true,
    devtool: 'source-map'
};
