import {observable, computed, useStrict} from 'mobx';
import {Column} from './Column';

useStrict(true);

export class Project {
    id: string = '';
    @observable title: string = '';
    @observable description: string = '';
    @observable columns: Array<Column> = [];
    constructor(id: string, title: string, description: string, columns: Array<Column>) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columns = columns;
    }
}