require.extensions['.jsx'] = function (module, filename) {
    var jsx = require('react-tools');
    var fs = require('fs');
    var source = fs.readFileSync(filename, 'utf8');
    try {
        source = jsx.transform(source);
    }
    catch (error) {
        throw new Error('Error transforming ' + filename + ' to JS: ' + error.toString());
    }
    module._compile(source, filename);
};
