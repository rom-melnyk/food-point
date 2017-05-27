const test = require('./test');

const FP = {
    start() {
        console.log(`It works: ${test}!`);
    }
}

if (window) {
    window.FP = FP;
}

module.exports = FP;
