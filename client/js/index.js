const { startAdminApp } = require('./admin/admin');

const FP = {
    startApp() {
        console.log(`It works!`);
    },
    startAdminApp
}

if (window) {
    window.FP = FP;
}

module.exports = FP;
