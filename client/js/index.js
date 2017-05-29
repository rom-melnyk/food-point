const { startAdminApp } = require('./admin/admin-app');

const FP = {
    startApp() {
        console.log(`It works!`);
    },
    startAdminApp
};

if (window) {
    window.FP = FP;
}

module.exports = FP;
