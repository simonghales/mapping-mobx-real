import * as React from 'react';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import store from '../../store';
import {Column as ColumnClass} from '../../classes/Column';
import EditorColumn from '../EditorColumn/EditorColumn';
import EditorHeader from '../EditorHeader/EditorHeader';

interface IEditorState {
    dragging?: boolean
}

@observer
export default class Editor extends React.Component<{}, IEditorState> {
    constructor(props:{}) {
        super(props);
        this.state = {
            dragging: false
        };
        this.beginDrag = this.beginDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }
    beginDrag() {
        console.log('begin drag');
        this.setState({
            dragging: true
        });
    }
    endDrag() {
        console.log('end drag...');
        this.setState({
            dragging: false
        });
    }
    renderColumns(columns: Array<ColumnClass>) {
        let renderedColumns: Array<any> = [];
        for (let i = 0, len = columns.length; i < len; i++) {
            const column = columns[i];
            renderedColumns.push(
                <div className='editor__column' key={column.id}>
                    <EditorColumn beginDrag={this.beginDrag} endDrag={this.endDrag} column={column} />
                </div>
            );
        }
        return renderedColumns;
    }
    render() {
        const {project} = store;
        const {columns} = project;
        const dragging = this.state.dragging;
        const editorClassNames = classNames([
            'editor',
            {
                'editor--dragging': dragging
            }
        ]);
        return (
            <div className={editorClassNames}>
                <EditorHeader project={project} columns={columns} />
                <div className='editor__body'>
                    {this.renderColumns(columns)}
                </div>
            </div>
        );
    }
}
