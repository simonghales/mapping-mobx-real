import * as React from 'react';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import {Card as CardClass} from '../../classes/Card';

export interface IEditorCard {
    card: CardClass;
}

@observer
export default class EditorCard extends React.Component<IEditorCard, {}> {
    render() {
        const {card} = this.props;
        const {title, description} = card;
        const cardClasses = classNames([
            'editorCard',
            {
                'editorCard--noDescription': !description
            }
        ]);
        return (
            <div className={cardClasses}>
                <h3 className='editorCard__title'>{title}</h3>
                <p className='editorCard__description'>
                    {description}
                </p>
            </div>
        );
    }
}
