
var path = require('path');
var stylus = require('stylus');
var fs = require('fs-promise');
var nib = require('nib');
var when = require('when');
var root = path.join(__dirname, '../../');

module.exports = function (file) {

    file = path.join(root, file);

    return fs
        .readFile(file, 'utf8')
        .then(function (source) {
            var defer = when.defer();
            stylus(source)
                .set('filename', file)
                .define('url', stylus.resolver())
                .use(nib())
                .render(function (err, css) {
                    err ? defer.reject(err) : defer.resolve(css);
                });
            return defer.promise;
        })
        .then(function (css) {
            var style = document.createElement('style');
            style.innerHTML = css;
            document.querySelector('head').appendChild(style);
        });
};
