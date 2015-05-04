var React = require('react');
var Todo = require('./Todo.jsx');

var AppStore = require('../store/App.js');
var TodoStore = require('../store/Todo.js');

var TodoList = React.createClass({


    getInitialState: function () {
        return {
            todos: TodoStore.getAll()
        }
    },

    onListChange: function (e) {
        this.setState({
            todos: TodoStore.getAll()
        });
    },

    componentDidMount: function () {
        TodoStore.addListener(this.onListChange);
    },

    componentWillUnmount: function () {
        TodoStore.removeListener(this.onListChange);
    },

    render: function () {

        var project = this.props.project;

        var todos = this.state.todos.reduce(
            function (result, todo) {
                if (todo.state !== 'finished' && project === todo.project) {
                    result.push(<Todo todo={todo} key={todo.id} />);
                }
                return result;
            },
            []
        );

        var finished = this.state.todos.reduce(
            function (result, todo) {
                if (todo.state === 'finished' && project === todo.project) {
                    result.push(<Todo todo={todo} key={todo.id} />);
                }
                return result;
            },
            []
        );

        return (
            <div className="todolist">
                {todos}
                <footer>
                    <label>
                        已完成<i>{TodoStore.getProjectFinishedCount(project)}</i>个任务
                    </label>
                </footer>
                {finished}
            </div>
        );
    }

});

module.exports = TodoList;
