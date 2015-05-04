/**
 * @file Todo组件
 * @author leonlu(ludafa@outlook.com)
 */

var React = require('react/addons');
var TodoAction = require('../action/Todo.js');

var Todo = React.createClass({

    finish: function () {
        TodoAction.finish(this.props.todo.id);
    },

    revive: function () {
        TodoActino.revive(this.props.todo.id);
    }

    render: function () {

        var state = this.props.todo.state;

        var iconClassName = React.addons.classSet({
            'icon': true,
            'icon-weixuanzhongyuanquan': state !== 'finished',
            'icon-xuanzhongyuanquan': state === 'finished'
        });

        return (
            <div className="todo">
                <i className={iconClassName} onClick={this.finish}/>
                {this.props.todo.content}
            </div>
        );
    }

});

module.exports = Todo;
