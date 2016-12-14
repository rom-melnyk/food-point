const pictureScenarios = require('./views/pictures-form/scenarios.es');

const FP = {
    scenarions: {
        '/pictures': pictureScenarios
    }
};

FP.startApp = () => {
    const scenario = FP.scenarions[ location.pathname ];
    if (!scenario || !scenario.init) {
        console.error('Scenario not found')
    }

    console.info(`Running "${location.pathname}" init scenario`);
    scenario.init();
};

global.FP = FP;
