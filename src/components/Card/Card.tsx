import * as React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../../store';
import {Card as CardClass} from '../../classes/Card';

export interface ICard {
    card: CardClass;
}

@observer
export default class Card extends React.Component<ICard, {}> {
    render() {
        return (
            <li>
                CARD
            </li>
        );
    }
}
