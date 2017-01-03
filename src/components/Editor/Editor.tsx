import * as React from 'react';
import {observer} from 'mobx-react';
import store from '../../store';
import {Column as ColumnClass} from '../../classes/Column';
import EditorColumn from '../EditorColumn/EditorColumn';
import EditorHeader from '../EditorHeader/EditorHeader';

@observer
export default class Editor extends React.Component<{}, {}> {
    renderColumns(columns: Array<ColumnClass>) {
        let renderedColumns: Array<any> = [];
        for (let i = 0, len = columns.length; i < len; i++) {
            const column = columns[i];
            renderedColumns.push(
                <div className='editor__column' key={column.id}>
                    <EditorColumn column={column} />
                </div>
            );
        }
        return renderedColumns;
    }
    render() {
        const {project} = store;
        const {columns} = project;
        return (
            <div className='editor'>
                <EditorHeader project={project} columns={columns} />
                <div className='editor__body'>
                    {this.renderColumns(columns)}
                </div>
            </div>
        );
    }
}
