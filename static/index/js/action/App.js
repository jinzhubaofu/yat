/**
 * @file App Action
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

'use strict';

var AppDispatcher = require('../dispatcher/App.js');
var AppConstant = require('../constant/App.js');

module.exports = {

    setCurrentProject: function (id) {
        AppDispatcher.dispatch({
            type: AppConstant.SET_CURRENT_PROJECT,
            id: id
        });
    }

};
