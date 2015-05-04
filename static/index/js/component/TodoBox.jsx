var React = require('react');

var TodoList = require('./TodoList.jsx');
var TodoForm = require('./TodoForm.jsx');

var TodoBox = React.createClass({

    render: function () {
        return (
            <section className="todobox">
                <TodoForm />
                <TodoList project={this.props.project} />
            </section>
        );
    }

});

module.exports = TodoBox;
