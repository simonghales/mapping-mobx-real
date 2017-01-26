import * as React from 'react';
// const ReactModal = require('react-modal');
// import * as Modal from 'react-modal';
const ReactCSSTransitionGroup: any = require('react-addons-css-transition-group');
const Modal:any = require('react-modal');
import {action} from 'mobx';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import {Column as ColumnClass} from '../../classes/Column';
import {Project as ProjectClass} from '../../classes/Project';
import {addColumn} from '../../utils/data/column';
import {modalStyles} from '../../utils/modals/modal';
import EditColumn from '../EditColumn/EditColumn';
import {DURATION_TRANSITION_DEFAULT} from '../../constants/durations';

export interface IEditorHeader {
    columns: Array<ColumnClass>;
    project: ProjectClass;
}

export interface IEditorHeaderState {
    editingColumn?: boolean;
    editingColumnModalIsClosing?: boolean;
    newColumnOpen?: boolean;
    newColumnTitle?: string;
    selectedColumn?: ColumnClass;
}

export interface IEditorHeaderInputs {
    textInput: HTMLInputElement;
}

@observer
export default class EditorHeader extends React.Component<IEditorHeader, IEditorHeaderState> {
    inputs: IEditorHeaderInputs = {
        textInput: null
    };
    constructor(props:IEditorHeader) {
        super(props);
        this.state = {
            editingColumn: false,
            editingColumnModalIsClosing: false,
            newColumnOpen: false,
            newColumnTitle: '',
            selectedColumn: null,
        };
        this.addNewColumn = this.addNewColumn.bind(this);
        this.cancelNewColumn = this.cancelNewColumn.bind(this);
        this.closeEditingColumnModal = this.closeEditingColumnModal.bind(this);
        this.createNewColumn = this.createNewColumn.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    addNewColumn() {
        this.setState({
            newColumnOpen: true
        });
        if(this.inputs.textInput) {
            setTimeout(() => {
                this.inputs.textInput.focus();
            }, 100);
        }
    }
    cancelNewColumn() {
        this.setState({
            newColumnOpen: false
        });
    }
    closeEditingColumnModal() {
        this.setState({
            editingColumn: false,
            editingColumnModalIsClosing: true,
            selectedColumn: null
        });
        setTimeout(() => {
            this.setState({
                editingColumnModalIsClosing: false
            });
        }, DURATION_TRANSITION_DEFAULT);
    }
    createNewColumn() {
        const {project} = this.props;
        const {newColumnTitle} = this.state;
        if(!newColumnTitle) return;
        action(() => {
            addColumn(project, newColumnTitle);
        })();
        this.setState({
            newColumnOpen: false,
            newColumnTitle: ''
        });
    }
    editColumn(column: ColumnClass) {
        this.setState({
            editingColumn: true,
            selectedColumn: column
        });
    }
    handleTitleChange(event:any) {
        this.setState({
            newColumnTitle: event.target.value
        });
    }
    renderColumns() {
        const {columns} = this.props;
        let renderedColumns: Array<any> = []; // eslint-disable-line prefer-const

        for (let index = 0, len = columns.length; index < len; index++) {
            const column = columns[index];
            const {id, title} = column;
            renderedColumns.push(
                <div className='editorHeader__column' key={id}>
                    <span className='editorHeader__column__textWrapper'>
                        <span className='editorHeader__column__text'>{title}</span>
                        <span className='editorHeader__column__editIcon' onClick={() => {this.editColumn(column)}}>E</span>
                    </span>
                </div>
            );
        }

        return renderedColumns;
    }
    render() {
        const {columns} = this.props;
        const {
            editingColumn,
            newColumnOpen,
            newColumnTitle,
            selectedColumn,
        } = this.state;
        const editingColumnModalIsClosing = this.state.editingColumnModalIsClosing;
        const headerClassNames = classNames([
            'editorHeader',
            {
                'editorHeader--noColumns': !columns.length,
                'editorHeader--addingNewColumn': newColumnOpen
            }
        ]);
        const editingColumnModalClassNames = classNames([
            'reactModalDefault',
            {
                'reactModalDefault--closing': editingColumnModalIsClosing
            }
        ]);
        const editingColumnModalOverlayClassNames = classNames([
            'reactModalOverlay',
            {
                'reactModalOverlay--closing': editingColumnModalIsClosing
            }
        ]);
        return (
            <header className={headerClassNames}>
                {this.renderColumns()}
                <div className='editorHeader__addNewWrapper'>
                    <button className='editorHeader__addNewWrapper__button editorHeader__addNew'
                            onClick={this.addNewColumn}>
                        Add new column
                    </button>
                    <span className='editorHeader__adding'>
                        <input className='editorHeader__addInput' type="text"
                               ref={(element) => {
                                   if(element) {
                                       this.inputs.textInput = element;
                                   }
                               }}
                               value={newColumnTitle} onChange={this.handleTitleChange} />
                        <button className='editorHeader__addNewWrapper__button editorHeader__add'
                                onClick={this.createNewColumn}>
                            Add
                        </button>
                        <button className='editorHeader__addNewWrapper__button editorHeader__cancel'
                                onClick={this.cancelNewColumn}>
                            x
                        </button>
                    </span>
                </div>
                <Modal
                    isOpen={editingColumn}
                    contentLabel='Modal'
                    style={modalStyles}
                    onRequestClose={this.closeEditingColumnModal}
                    closeTimeoutMS={DURATION_TRANSITION_DEFAULT}
                    className={editingColumnModalClassNames}
                    overlayClassName={editingColumnModalOverlayClassNames}>
                    <EditColumn selectedColumn={selectedColumn} closeModal={this.closeEditingColumnModal} />
                </Modal>
            </header>
        );
    }
}
