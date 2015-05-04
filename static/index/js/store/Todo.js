/**
 * @file Todo Store
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var AppStore = require('./App.js');
var AppDispatcher = require('../dispatcher/App.js');
var TodoConstant = require('../constant/Todo.js');
var ProjectConstant = require('../constant/Project.js');
var u = require('underscore');
var Emitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');

var emitter = new Emitter();

var data = require('../../../../storage/todo.json');

var TodoStore = {

    addListener: function (listener) {
        emitter.on('change', listener);
    },

    removeListener: function (listener) {
        emitter.removeListener('change', listener);
    },

    getAll: function () {
        return data;
    },

    getProjectCount: function (project) {
        return u.chain(data)
            .filter({project: project})
            .reject({state: 'finished'})
            .value()
            .length;
    },

    getProjectFinishedCount: function (projectId) {
        return u
            .chain(data)
            .filter({project: projectId, state: 'finished'})
            .value()
            .length;
    }

};

function saveToFile(data) {
    fs.writeFileSync(
        path.join(__dirname, '../../../../storage/todo.json'),
        JSON.stringify(data, 0, 2),
        'utf8'
    );
}

function addTodo(content) {

    var todo = {
        id: new Date().getTime().toString(36),
        content: content,
        project: AppStore.getCurrentProject()
    };

    data = [todo].concat(data);
    emitter.emit('change');

    saveToFile(data);

}

function finishTodo(id) {
    var todo = u.find(data, {id: id});
    if (todo) {
        todo.state = 'finished';
        todo.finishTime = new Date().getTime().toString(36);
        saveToFile(data);
        emitter.emit('change');
    }
}

AppDispatcher.register(function (action) {

    switch (action.type) {
        case TodoConstant.ADD:
            addTodo(action.content);
            break;
        case TodoConstant.FINISH:
            finishTodo(action.id);
            break;
        case ProjectConstant.SET_CURRENT:

    }

});

module.exports = TodoStore;
