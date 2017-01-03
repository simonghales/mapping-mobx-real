import * as React from 'react';
import {observer} from 'mobx-react';
import store from '../../store';
import Card from '../Card/Card';
import {Column as ColumnClass} from '../../classes/Column';
import {Card as CardClass} from '../../classes/Card';

export interface IColumn {
    column: ColumnClass;
}

@observer
export default class Column extends React.Component<IColumn, {}> {
    renderCards(cards: Array<CardClass>) {
        let renderedCards: Array<any> = [];
        for (let i = 0, len = cards.length; i < len; i++) {
            const card = cards[i];
            renderedCards.push(<Card card={card} key={card.id} />);
        }
        return renderedCards;
    }
    render() {
        const {column} = this.props;
        const {cards} = column;
        return (
            <li>
                <div>
                    {column.title}
                    <ul>
                        {this.renderCards(cards)}
                    </ul>
                </div>
            </li>
        );
    }
}
