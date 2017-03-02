const version = require('../version.json');
const test = require('./test');

const App = {
    run() {
        console.info(version);
        console.info(test);
    }
};

if (window) {
    window.App = App;
} else {
    module.export = App;
}
