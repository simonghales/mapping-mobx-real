import * as React from 'react';
// const ReactModal = require('react-modal');
// import * as Modal from 'react-modal';
const Modal:any = require('react-modal');
import {action} from 'mobx';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import {Column as ColumnClass} from '../../classes/Column';
import {Project as ProjectClass} from '../../classes/Project';
import {addColumn} from '../../utils/data/column';
import {modalStyles} from '../../utils/modals/modal';
import EditColumn from '../EditColumn/EditColumn';

export interface IEditorHeader {
    columns: Array<ColumnClass>;
    project: ProjectClass;
}

export interface IEditorHeaderState {
    newColumnOpen?: boolean;
    newColumnTitle?: string;
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
            newColumnOpen: false,
            newColumnTitle: ''
        };
        this.addNewColumn = this.addNewColumn.bind(this);
        this.cancelNewColumn = this.cancelNewColumn.bind(this);
        this.createNewColumn = this.createNewColumn.bind(this);
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
                        <span className='editorHeader__column__editIcon'>E</span>
                    </span>
                </div>
            );
        }

        return renderedColumns;
    }
    render() {
        const {columns} = this.props;
        const {
            newColumnOpen,
            newColumnTitle
        } = this.state;
        const headerClassNames = classNames([
            'editorHeader',
            {
                'editorHeader--noColumns': !columns.length,
                'editorHeader--addingNewColumn': newColumnOpen
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
                <Modal isOpen={true} style={modalStyles}>
                    <EditColumn />
                </Modal>
            </header>
        );
    }
}
