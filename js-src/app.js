const version = require('../version.json');
const test = require('./test');

const FP = {
    run: function run() {
        console.info(version);
        console.info(test);
    }
};

if (window) {
    window.FP = FP;
} else {
    module.export = FP;
}
