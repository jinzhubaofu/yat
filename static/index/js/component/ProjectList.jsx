/**
 * @file 啊哈哈
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var React = require('react');
var Project = require('./Project.jsx');
var ProjectStore = require('../store/Project.js');
var AppStore = require('../store/App.js');

var ProjectList = React.createClass({

    getInitialState: function () {
        return {
            projects: ProjectStore.getAll(),
            isOpen: false,
            project: AppStore.getCurrentProject()
        }
    },

    componentDidMount: function () {
        AppStore.addListener(this.onStoreChange);
        ProjectStore.addListener(this.onStoreChange);
    },

    onStoreChange: function () {
        this.setState({
            project: AppStore.getCurrentProject(),
            projects: ProjectStore.getAll()
        });
    },

    render: function () {
        var current = this.state.project;
        var projects = this.state.projects.map(function (project) {
            var active = current === project.id;
            return (
                <Project
                    project={project}
                    key={project.id}
                    active={active} />
            );
        });
        return (
            <div className="projectlist">
                {projects}
            </div>
        );
    }

});

module.exports = ProjectList;
