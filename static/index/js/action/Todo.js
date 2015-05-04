/**
 * @file Action - Todo
 * @author leonlu(ludafa@outlook.com)
 */

'use strict';

var AppDispatcher = require('../dispatcher/App.js');
var TodoConstant = require('../constant/Todo.js');

exports.add = function (todo) {

    AppDispatcher.dispatch({
        type: TodoConstant.ADD,
        content: todo
    });

};

exports.finish = function (id) {
    AppDispatcher.dispatch({
        type: TodoConstant.FINISH,
        id: id
    });
}
