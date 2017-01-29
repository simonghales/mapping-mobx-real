import * as React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');
import store from '../../store';
import {Card as CardClass} from '../../classes/Card';
import {Column as ColumnClass} from '../../classes/Column';
import DropTargetEditorCard from '../DropTargetEditorCard/DropTargetEditorCard';
import DropTargetEditorCardButton from '../DropTargetEditorCardButton/DropTargetEditorCardButton';
import EditorCard from '../EditorCard/EditorCard';
import EditorNewCard from '../EditorNewCard/EditorNewCard';
import {addCard} from '../../utils/data/card';

export interface IEditorColumn {
    beginDrag(): void,
    endDrag(): void,
    column: ColumnClass;
}

export interface IEditorColumnState {
    displacedCardIndexFromHover?: number;
    newCardOpen?: Boolean;
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
            displacedCardIndexFromHover: null,
            newCardOpen: false
        };
        this.addNewCard = this.addNewCard.bind(this);
        this.cancelNewCard = this.cancelNewCard.bind(this);
        this.cardMightBeDropped = this.cardMightBeDropped.bind(this);
        this.cardDropButtonHovered = this.cardDropButtonHovered.bind(this);
        this.cardDropButtonUnhovered = this.cardDropButtonUnhovered.bind(this);
        this.createNewCard = this.createNewCard.bind(this);
        this.dropButtonHovered = this.dropButtonHovered.bind(this);
        this.dropButtonUnhovered = this.dropButtonUnhovered.bind(this);
        this.moveCard = this.moveCard.bind(this);
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
    cardMightBeDropped() {
        console.log('card might be dropped...');
    }
    cardDropButtonHovered(index: number) {
        this.setState({
            displacedCardIndexFromHover: index
        });
    }
    cardDropButtonUnhovered(index: number) {
        this.setState({
            displacedCardIndexFromHover: null
        });
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
    dropButtonHovered(position: 'top' | 'bottom') {
        this.cardDropButtonHovered(0);
    }
    dropButtonUnhovered(position: 'top' | 'bottom') {
        this.cardDropButtonUnhovered(0);
    }
    moveCard(card: CardClass, fromIndex: number, toIndex: number, toColumnId: string) {
        console.log('move this card', card, fromIndex, toIndex, toColumnId);
        console.log('and this columns id', this.props.column.id);
        store.project.moveCard(fromIndex, this.props.column.id, toIndex, toColumnId);
    }
    renderCards(cards: Array<CardClass>) {
        let renderedCards: Array<any> = [];
        const column = this.props.column;
        const beginDrag = this.props.beginDrag;
        const endDrag = this.props.endDrag;
        const displacedCardIndexFromHover = this.state.displacedCardIndexFromHover;
        for (let i = 0, len = cards.length; i < len; i++) {
            const card = cards[i];
            const cardClassNames = classNames([
                'editorColumn__card',
                {
                    'editorColumn__card--displaced': i === displacedCardIndexFromHover,
                }
            ]);
            renderedCards.push(
                <div className={cardClassNames} key={card.id}>
                    <DropTargetEditorCard cardDropButtonHovered={this.cardDropButtonHovered}
                                          cardDropButtonUnhovered={this.cardDropButtonUnhovered}
                                          beginDrag={beginDrag}
                                          endDrag={endDrag}
                                          moveCard={this.moveCard}
                                          cardMightBeDropped={this.cardMightBeDropped}
                                          index={i}
                                          columnId={column.id}
                                          card={card}>
                        <EditorCard card={card} />
                    </DropTargetEditorCard>
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
                <div className='editorColumn__topDropzone'>
                    <DropTargetEditorCardButton
                        position='top'
                        columnId={column.id}
                        index={0}
                        dropButtonHovered={this.dropButtonHovered}
                        dropButtonUnhovered={this.dropButtonUnhovered} />
                </div>
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
