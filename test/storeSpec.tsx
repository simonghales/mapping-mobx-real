import {useStrict} from 'mobx';
import {Store} from '../src/store';

describe('The store', () => {
    let store: Store;

    beforeEach(() => {
        store = new Store();
        useStrict(false);
    });

    it('should be initialized with 0', () => {
        expect(store.clicked).toEqual(0);
        expect(store.clickedSquared).toEqual(0);
    });

    it('should correctly calculate the square', () => {
        store.clicked = 3;
        expect(store.clickedSquared).toEqual(9);
    });
});
