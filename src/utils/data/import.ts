import {Card} from '../../classes/Card';
import {Column} from '../../classes/Column';
import {Project} from '../../classes/Project';
import {Store} from '../../store';

/*

    Have a json full of data

    Load the json

    Need to convert cards into Card objects

    Need to convert columns into Column objects

    Need to create Project object using the above

    Need to insert into the store

 */

export function loadProject(store: Store) {
    const exampleData: any = require('../../data/example/example.json');
    const {id, title, description} = exampleData;
    const columns = getColumns(exampleData);
    store.project = new Project(id, title, description, columns);
}

export function getColumns(project: any) {
    const {columns: columnsRawData} = project;
    let columns: Array<Column> = [];
    for (let i = 0, len = columnsRawData.length; i < len; i++) {
        const column = columnsRawData[i];
        const {id, title} = column;
        const cards = getCards(column);
        columns.push(new Column(id, title, cards));
    }
    return columns;
}

export function getCards(column: any) {
    const {cards: cardsRawData} = column;
    let cards: Array<Card> = [];
    for (let i = 0, len = cardsRawData.length; i < len; i++) {
        const card = cardsRawData[i];
        const {id, title, description} = card;
        cards.push(new Card(id, title, description));
    }
    return cards;
}