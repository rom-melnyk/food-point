import Constants from './constants/constants.es6';

export default {
    route: '',
    dishes: {
        children: []
    },
    users: [],
    order: {
        what: [], // {dish: Object, count: Number},
        where: '',
        when: '',
        notes: ''
    },
    me: {},
    modals: {},
    authProviders: [ Constants.AUTH_PROVIDERS.PLEASE_WAIT ],
    version: {}
};
