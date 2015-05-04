/**
 * @file 清单 新建 / 编辑
 * @author leonlu(ludafa@outlook.com)
 */

/*eslint-env node*/

var React = require('react/addons');

var ProjectAction = require('../action/Project.js');
var ProjectStore = require('../store/Project.js');

var ProjectForm = React.createClass({

    getInitialState: function () {
        return {
            content: ProjectStore.isFormDialogOpen(),
            isOpen: false
        };
    },

    onProjectStoreChange: function () {

        var data = ProjectStore.getFormData();
        var isOpen = !!data;

        if (!isOpen) {
            this.setState({
                isOpen: false
            });
            return;
        }

        if (data.act === 'create') {
            this.setState({
                act: 'create',
                content: '',
                id: '',
                isOpen: true,
                submitDisabled: true
            });
            return;
        }

        var project = ProjectStore.get(data.id);

        this.setState({
            isOpen: true,
            content: project.content,
            id: project.id,
            act: 'edit',
            submitDisabled: false
        });

    },

    componentDidMount: function () {
        ProjectStore.addListener(this.onProjectStoreChange);
    },

    componentWillUnmount: function () {
        ProjectStore.removeListener(this.onProjectStoreChange);
    },

    onInput: function (e) {
        var value = e.target.value;
        this.setState({
            content: value,
            submitDisabled: !value
        });
    },

    save: function (e) {
        e.preventDefault();

        var id = this.state.id;
        var content = this.state.content;

        if (id) {
            ProjectAction.update(id, content);
        }
        else {
            ProjectAction.add(content);
        }

        this.closeDialog();

    },

    closeDialog: function () {
        ProjectAction.closeFormDialog();
    },

    getSubmitButton: function () {
        var text = this.state.act === 'create' ? '创建清单' : '完成';
        return (
            <button
                type="submit"
                disabled={this.state.submitDisabled}>
                {text}
            </button>
        );
    },

    render: function () {
        return (
            <dialog className="project-form" open={this.state.isOpen}>
                <form onSubmit={this.save} >
                    <input
                        name="content"
                        placeholder="清单名称"
                        value={this.state.content}
                        onChange={this.onInput} />
                    <footer>
                        <button
                            type="button"
                            onClick={this.closeDialog}>
                            取消
                        </button>
                        {this.getSubmitButton()}
                    </footer>
                </form>
            </dialog>
        );
    }

});

module.exports = ProjectForm;
