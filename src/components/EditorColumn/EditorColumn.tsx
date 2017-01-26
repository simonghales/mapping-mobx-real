import * as React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import {Card as CardClass} from '../../classes/Card';
import {Column as ColumnClass} from '../../classes/Column';
import DraggableEditorCard from '../DraggableEditorCard/DraggableEditorCard';
import EditorCard from '../EditorCard/EditorCard';
import EditorNewCard from '../EditorNewCard/EditorNewCard';
import {addCard} from '../../utils/data/card';

export interface IEditorColumn {
    column: ColumnClass;
}

export interface IEditorColumnState {
    newCardOpen: Boolean;
}

export interface IEditorColumnInputs {
    textInput: HTMLTextAreaElement;
}

@observer
export default class EditorColumn extends React.Component<IEditorColumn, IEditorColumnState> {
    inputs: IEditorColumnInputs = {
        textInput: null
    };
    constructor(props:any) {
        super(props);
        this.state = {
            newCardOpen: false
        };
        this.addNewCard = this.addNewCard.bind(this);
        this.cancelNewCard = this.cancelNewCard.bind(this);
        this.createNewCard = this.createNewCard.bind(this);
    }
    addNewCard() {
        this.setState({
            newCardOpen: true
        });
        setTimeout(() => {
            this.inputs.textInput.focus();
        }, 100);
    }
    cancelNewCard() {
        this.setState({
            newCardOpen: false
        });
        console.log('cancel new card');
    }
    createNewCard(title: string) {
        const {column} = this.props;
        action(() => {
            addCard(column, title);
        })();
        this.setState({
            newCardOpen: false
        });
        console.log('create new card', title);
    }
    renderCards(cards: Array<CardClass>) {
        let renderedCards: Array<any> = [];
        for (let i = 0, len = cards.length; i < len; i++) {
            const card = cards[i];
            renderedCards.push(
                <div className='editorColumn__card' key={card.id}>
                    <DraggableEditorCard>
                        <EditorCard card={card} />
                    </DraggableEditorCard>
                </div>
            );
        }
        return renderedCards;
    }
    render() {
        const {column} = this.props;
        const {newCardOpen} = this.state;
        const {cards} = column;
        const columnClassNames = classNames([
            'editorColumn',
            {
                'editorColumn--noCards': !cards.length,
                'editorColumn--addingNewCard': newCardOpen
            }
        ]);
        return (
            <div className={columnClassNames}>
                <div className='editorColumn__cards'>
                    {this.renderCards(cards)}
                </div>
                <div className='editorColumn__newCard'>
                    <EditorNewCard ref={(element) => { if(element) this.inputs.textInput = element.inputs.textInput; }}
                                   cancelNewCard={this.cancelNewCard} createNewCard={this.createNewCard} />
                </div>
                <button className='editorColumn__addButton' onClick={this.addNewCard}>
                    Add new card
                </button>
            </div>
        );
    }
}
