var React = require('react');

var AppStore = require('../store/App.js');
var ProjectList = require('./ProjectList.jsx');
var ProjectForm = require('./ProjectForm.jsx');
var ProjectAction = require('../action/Project.js');

var ProjectBox = React.createClass({

    openDialog: function () {
        ProjectAction.openCreateDialog();
    },

    render: function () {
        return (
            <section className="projectbox">
                <ProjectList project={this.props.project} />
                <button onClick={this.openDialog}>
                    <i className="icon icon-add"></i>
                </button>
                <ProjectForm />
            </section>
        );
    }

});

module.exports = ProjectBox;
