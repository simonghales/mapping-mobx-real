import {action, observable, computed, useStrict} from 'mobx';
import {Card} from './Card';
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
    moveCard(fromIndex: number, fromColumnId: string, toIndex: number, toColumnId: string) {
        action(() => {
            const fromColumn: Column = this.columns.filter((element, index) => {
                return (element.id === fromColumnId);
            })[0];
            const toColumn: Column = this.columns.filter((element, index) => {
                return (element.id === toColumnId);
            })[0];
            const card: Card = fromColumn.cards.splice(fromIndex, 1)[0];
            toColumn.cards.splice(toIndex, 0, card);
        })();
    }
}