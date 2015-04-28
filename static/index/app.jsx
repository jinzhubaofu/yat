var React = require('react');
var Timer = require('./Timer.jsx');

exports.start = function () {
    React.render(<Timer />, document.querySelector('main'));
};
