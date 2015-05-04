/**
 * @file ProjectStore
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var ProjectConstant = require('../constant/Project.js');
var u = require('underscore');
var Emitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/App.js');

var data = require('../../../../storage/project.json');

var emitter = new Emitter();

var formDialogAction = null;

function saveToFile() {
    require('fs').writeFileSync(
        require('path').join(__dirname, '../../../../storage/project.json'),
        JSON.stringify(data, 0, 2),
        'utf8'
    );
}

var ProjectStore = {

    getAll: function () {
        return data;
    },

    addListener: function (listener) {
        emitter.on('change', listener);
    },

    removeListener: function (listener) {
        emitter.removeListener('change', listener);
    },

    isFormDialogOpen: function () {
        return !!formDialogAction;
    },

    get: function (id) {
        return u.find(data, {id: id});
    },

    getFormData: function () {
        return formDialogAction;
    }

};

function addProject(content) {
    var project = {
        content: content,
        id: new Date().getTime().toString(36)
    };
    data = [project].concat(data);
    saveToFile();
    emitter.emit('change');
}

function updateProject(id, content) {
    var project = u.find(data, {id: id});
    if (project) {
        project.content = content;
        saveToFile();
        emitter.emit('change');
    }
}

function closeFormDialog() {
    formDialogAction = null;
    emitter.emit('change');
}

function openFormDialog(act, id) {
    formDialogAction = {
        act: act,
        id: id
    };
    emitter.emit('change');
}

AppDispatcher.register(function (action) {
    switch (action.type) {
        case ProjectConstant.ADD:
            addProject(action.content);
            break;
        case ProjectConstant.UPDATE:
            updateProject(action.id, action.content);
            break;
        case ProjectConstant.CLOSE_FORM_DIALOG:
            closeFormDialog();
            break;
        case ProjectConstant.OPEN_EDIT_DIALOG:
            openFormDialog(action.act, action.id);
            break;
        case ProjectConstant.OPEN_CREATE_DIALOG:
            openFormDialog(action.act);
            break;
    }
});

module.exports = ProjectStore;
