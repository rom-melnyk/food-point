module.exports = {
    entry: ['./src/app.es6'],
    output: {
        path: __dirname + '/static/js',
        filename: 'script.js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loaders: ['style', 'css', 'sass?sourceMap'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.png$/, loader: 'url?limit=120000' },
            { test: /\.ttf(.*)?$/, loader: 'url?limit=60000' },
            { test: /\.eot(.*)?$/, loader: 'url?limit=60000' },
            { test: /\.svg(.*)?$/, loader: 'url?limit=60000' },
            { test: /\.woff(.*)?$/, loader: 'url?limit=60000' },
            { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    debug: true,
    devtool: 'source-map'
};
