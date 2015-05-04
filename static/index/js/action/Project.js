/**
 * @file Project Action
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var AppDispatcher = require('../dispatcher/App.js');
var ProjectConstant = require('../constant/Project.js');

module.exports = {

    add: function (content) {
        AppDispatcher.dispatch({
            type: ProjectConstant.ADD,
            content: content
        });
    },

    update: function (id, content) {
        AppDispatcher.dispatch({
            type: ProjectConstant.UPDATE,
            content: content,
            id: id
        });
    },

    openCreateDialog: function () {
        AppDispatcher.dispatch({
            type: ProjectConstant.OPEN_CREATE_DIALOG,
            act: 'create'
        });
    },

    openEditDialog: function (id) {
        AppDispatcher.dispatch({
            type: ProjectConstant.OPEN_EDIT_DIALOG,
            act: 'edit',
            id: id
        });
    },

    closeFormDialog: function () {
        AppDispatcher.dispatch({
            type: ProjectConstant.CLOSE_FORM_DIALOG
        });
    }

};
