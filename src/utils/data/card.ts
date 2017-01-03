
import {Card} from '../../classes/Card'
import {Column} from '../../classes/Column'

export function addCard(column: Column, title: string) {
    column.cards.push(
        new Card(Date.now().toString(), title, '')
    );
}