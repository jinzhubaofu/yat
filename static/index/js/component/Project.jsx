/**
 * @file Project
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var React = require('react/addons.js');

var AppAction = require('../action/App.js');
var AppStore = require('../store/App.js');
var TodoStore = require('../store/Todo.js');
var ProjectAction = require('../action/Project.js');

var Project = React.createClass({


    getInitialState: function () {
        return {
            count: TodoStore.getProjectCount(this.props.project.id)
        };
    },

    componentDidMount: function () {
        TodoStore.addListener(this.onTodoChange);
    },

    onTodoChange: function () {
        this.setState({
            count: TodoStore.getProjectCount(this.props.project.id)
        });
    },

    onClick: function () {
        AppAction.setCurrentProject(this.props.project.id);
    },

    getCounter: function () {
        var count = this.state.count;
        return count > 1
            ? <b>{count}</b>
            : null;
    },

    editProject: function () {
        ProjectAction.openEditDialog(this.props.project.id);
    },

    getEditor: function () {
        return this.props.active
            ? (
                <b className="editor" onClick={this.editProject}>
                    <i className="icon icon-pencil"></i>
                </b>
            )
            : null;
    },

    render: function () {

        var className = React.addons.classSet({
            project: true,
            active: this.props.active
        });

        return (
            <div className={className} onClick={this.onClick}>
                <i className="icon icon-list"></i>
                {this.props.project.content}
                {this.getCounter()}
                {this.getEditor()}
            </div>
        );
    }

});

module.exports = Project;
