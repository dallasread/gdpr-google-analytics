var loadExternal = require('load-external'),
    cookies = require('browser-cookies'),
    COOKIE_NAME = 'gdpr-google-analytics',
    _ = window.GDPRGoogleAnalytics = window.GDPRGoogleAnalytics || {};

_.defaults = _.defaults || {
    content: 'By clicking "Accept All Cookies," you agree to the storing of first- and third-party cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.',
    buttonColor: '#23AE53',
    buttonText: '&check; &nbsp; Accept All Cookies',
    policyText: '',
    policyURL: ''
};

_.eachDependency = _.eachDependency || function eachDependency(func) {
    if (!_.dependency || !(_.dependency instanceof Array)) return;

    var loaded = {};

    return _.dependency.map(function(dependency) {
        var scriptName = dependency[0];

        if (!loaded[scriptName]) {
            loaded[scriptName] = true;
            func(scriptName);
        }
    });
};

_.eachEvent = _.eachEvent || function eachEvent(type, func) {
    if (!_.on || !(_.on instanceof Array)) return;

    return _.on.filter(function(event) {
        return event[0] === type;
    }).map(function(event) {
        func(event[1]);
    });
};

_.getVars = _.getVars || function getVars() {
    var vars = {};

    if (!_.vars || !(_.vars instanceof Array)) return _.vars || vars;

    for (var i = _.vars.length - 1; i >= 0; i--) {
        vars[_.vars[i][0]] = _.vars[i][1];
    }

    _.vars = vars;

    return _.vars;
};

_.notice = _.notice || function notice() {
    var template = require('./notice.html'),
        vars = _.getVars();

    for (var key in _.defaults) {
        template = template.replace('|' + key + '|', vars[key] || _.defaults[key]);
    }

    return template;
};

_.resolveDependencies = _.resolveDependencies || function resolveDependencies() {
    if (!_.dependency || !_.dependency.length) {
        _.dependency = [['https://www.google-analytics.com/analytics.js']];
    }

    _.eachDependency(loadExternal);
};

_.accept = _.accept || function accept(parentNode) {
    document.body.removeChild(parentNode);

    cookies.set(COOKIE_NAME, '1', { expires: 365 });

    _.eachEvent('accept', function(func) {
        func.call(_);
    });

    _.resolveDependencies();
};

_.show = _.show || function show() {
    var _ = this;
    document.body.innerHTML += _.notice();
};

if (cookies.get(COOKIE_NAME)) {
    _.resolveDependencies();
} else {
    _.show();
}

module.exports = _;
