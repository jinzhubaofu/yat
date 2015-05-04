var React = require('react');

var TodoBox = require('./js/component/TodoBox.jsx');
var ProjectBox = require('./js/component/ProjectBox.jsx');

var AppStore = require('./js/store/App.js');

var App = React.createClass({

    getInitialState: function () {
        return {
            project: AppStore.getCurrentProject()
        };
    },

    componentDidMount: function () {
        AppStore.addListener(this.onStoreChange);
    },

    onStoreChange: function () {
        this.setState({
            project: AppStore.getCurrentProject()
        });
    },

    render: function () {

        var project = this.state.project;

        return (
            <main>
                <ProjectBox project={project} />
                <TodoBox project={project} />
            </main>
        );
    }

});


module.exports = App;
