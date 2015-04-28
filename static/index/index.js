
var app = require('./app.jsx');

function init() {
    require('../../lib/util/add-css')('static/index/index.styl').then(function () {
        document.body.removeChild(document.querySelector('.loading'));
        app.start();
    });
}

window.onload = init;

