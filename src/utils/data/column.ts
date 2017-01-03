
import {Column} from '../../classes/Column'
import {Project} from '../../classes/Project'

export function addColumn(project: Project, title: string) {
    project.columns.push(
        new Column(Date.now().toString(), title, [])
    );
}