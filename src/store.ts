import {observable, computed, useStrict} from 'mobx';
import {Card} from './classes/Card';
import {Column} from './classes/Column';
import {Project} from './classes/Project';

useStrict(true);

export class Store {
    @observable clicked: number = 0;
    @computed get clickedSquared() {
        return this.clicked * this.clicked;
    }
    @computed get thingy() {
        return 'thingy: ' + this.clicked;
    }

    id: string = '';
    @observable title: string = 'Mr. Boop Woop';
    @observable description: string = 'My description goes here...';
    @observable columns: Array<Column> = [];

    @observable project: Project = null;

}

export default new Store();
