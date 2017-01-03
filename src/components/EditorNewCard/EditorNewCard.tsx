import * as React from 'react';
import {observer} from 'mobx-react';
const classNames:any = require('classnames');

export interface IEditorNewCard {
    cancelNewCard: Function;
    createNewCard: Function;
}

export interface IEditorNewCardState {
    title: String;
}

export interface IEditorNewCardInputs {
    textInput: HTMLTextAreaElement;
}

@observer
export default class EditorNewCard extends React.Component<IEditorNewCard, IEditorNewCardState> {
    inputs: IEditorNewCardInputs = {
        textInput: null
    };
    constructor(props:IEditorNewCard) {
        super(props);
        this.state = {
            title: ''
        };
        this.createCard = this.createCard.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    createCard() {
        const {
            createNewCard
        } = this.props;
        const {
            title
        } = this.state;
        if (title) {
            createNewCard(title);
        }
        this.resetCard();
    }
    handleTitleChange(event:any) {
        this.setState({
            title: event.target.value
        });
    }
    resetCard() {
        this.setState({
            title: ''
        });
    }
    render() {
        const {
            cancelNewCard,
        } = this.props;
        const {
            title
        } = this.state;
        return (
            <div className='editorNewCard'>
                <div className='editorNewCard__card'>
                    <textarea ref={(input) => { this.inputs.textInput = input; }}
                              placeholder="Enter a title" value={title} onChange={this.handleTitleChange}></textarea>
                </div>
                <div className='editorNewCard__options'>
                    <button className='editorNewCard__addButton editorNewCard__option'
                            onClick={this.createCard}>
                        Add
                    </button>
                    <button className='editorNewCard__cancelButton editorNewCard__option'
                            onClick={cancelNewCard}>
                        x
                    </button>
                </div>
            </div>
        );
    }
}
