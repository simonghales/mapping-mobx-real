import {action, observable, computed, useStrict} from 'mobx';
import {Card} from './Card';

useStrict(true);

export class Column {
    id: string = '';
    @observable title: string = '';
    @observable cards: Array<Card> = [];
    constructor(id: string, title: string, cards: Array<Card>) {
        this.id = id;
        this.title = title;
        this.cards = cards;
    }
    setTitle(title: string) {
        action(() => {
            this.title = title;
        })();
    }
}