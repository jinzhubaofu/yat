/**
 * @file TodoForm
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var TodoAction = require('../action/Todo.js');
var AppStore = require('../store/App.js');
var ProjectStore = require('../store/Project.js');

var TodoForm = React.createClass({

    getInitialState: function () {
        return {
            todo: ''
        };
    },

    onChange: function (e) {
        this.setState({
            todo: e.target.value
        });
    },

    onSubmit: function (e) {
        e.preventDefault();

        var todo = this.state.todo;

        if (!todo) {
            return;
        }

        TodoAction.add(todo);
        this.setState({
            todo: ''
        })
    },

    render: function () {

        var project = ProjectStore.get(AppStore.getCurrentProject());

        var placeholder = '在『' + project.content + '』中添加一个任务...';

        return (
            <form className="todoform" onSubmit={this.onSubmit}>
                <input
                    onChange={this.onChange}
                    placeholder={placeholder}
                    value={this.state.todo}/>
            </form>
        );
    }

});

module.exports = TodoForm;
