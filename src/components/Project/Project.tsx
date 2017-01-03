import * as React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../../store';
import Column from '../Column/Column';
import {Column as ColumnClass} from '../../classes/Column';

@observer
export default class Project extends React.Component<{}, {}> {
    renderColumns(columns: Array<ColumnClass>) {
        let renderedColumns: Array<any> = [];
        for (let i = 0, len = columns.length; i < len; i++) {
            const column = columns[i];
            renderedColumns.push(<Column column={column} key={column.id} />);
        }
        return renderedColumns;
    }
    render() {
        const {project} = store;
        const {columns} = project;
        console.log('project columns', columns.slice());
        return (
            <div>
                <h1>Project Title:
                    <span>{project.title}</span>
                </h1>
                <h2>Project Description:
                    <span>{project.description}</span>
                </h2>
                <ul>
                    {this.renderColumns(columns)}
                </ul>
            </div>
        );
    }
}
