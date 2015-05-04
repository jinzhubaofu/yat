var App = require('./app.jsx');
var React = require('react');

function init() {
    require('../../lib/util/add-css')('static/index/index.styl').then(function () {
        document.body.removeChild(document.querySelector('.loading'));
        React.render(
            React.createElement(App),
            document.body
        );
    });
}

window.onload = init;

