/**
 * @file AppStore
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var AppDispatcher = require('../dispatcher/App.js');
var AppConstant = require('../constant/App.js');
var Emitter = require('events').EventEmitter;

var STORE_CHANGE_EVENT_NAME = 'APP_STORE_CHANGE';

var emitter = new Emitter();

var data = require('../../../../storage/app.json');

module.exports = {

    getCurrentProject: function () {
        return data.currentProject;
    },

    addListener: function (handler) {
        emitter.on(STORE_CHANGE_EVENT_NAME, handler);
    },

    removeListener: function (handler) {
        emitter.removeListener(STORE_CHANGE_EVENT_NAME, handler);
    }

};

function saveToFile() {
    require('fs').writeFileSync(
        require('path').join(__dirname, '../../../../storage/app.json'),
        JSON.stringify(data, 0, 2),
        'utf8'
    );
}

function setCurrentProject(next) {
    data.currentProject = next;
    saveToFile();
    emitter.emit(STORE_CHANGE_EVENT_NAME);
}

AppDispatcher.register(function (action) {

    switch (action.type) {
        case AppConstant.SET_CURRENT_PROJECT:
            setCurrentProject(action.id);
            break;
    }

});
