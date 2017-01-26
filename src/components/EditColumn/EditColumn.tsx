import * as React from 'react';
import {Column as ColumnClass} from '../../classes/Column';

export interface IEditColumnProps {
    closeModal(): void,
    selectedColumn: ColumnClass
}

export interface IEditColumnState {
    inputTitle: string
}

export interface IEditColumnInputs {
    textInput: HTMLInputElement;
}

export default class EditColumn extends React.Component<IEditColumnProps, IEditColumnState> {
    inputs: IEditColumnInputs = {
        textInput: null
    };
    constructor(props:IEditColumnProps) {
        super(props);
        this.state = {
            inputTitle: props.selectedColumn.title,
        };
        this.focusInput = this.focusInput.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }
    focusInput() {
        if(this.inputs.textInput) {
            setTimeout(() => {
                this.inputs.textInput.focus();
            }, 100);
        }
    }
    handleTitleChange(event:any) {
        this.setState({
            inputTitle: event.target.value
        });
    }
    saveChanges() {
        if(!this.state.inputTitle) return;
        const closeModal = this.props.closeModal;
        this.props.selectedColumn.setTitle(this.state.inputTitle);
        closeModal();
    }
    render() {
        const {selectedColumn} = this.props;
        const {inputTitle} = this.state;
        return (
            <div className='editColumn'>
                <div className='editColumn__titleWrapper'>
                    <input type='text' placeholder='Column Title'
                           className='editColumn__title'
                           ref={(element) => {
                                   if(element) {
                                       this.inputs.textInput = element;
                                       this.focusInput();
                                   }
                               }}
                           value={inputTitle} onChange={this.handleTitleChange}/>
                </div>
                <div className='editColumn__options'>
                    <button className='editColumn__save' onClick={this.saveChanges}>Save Changes</button>
                </div>
            </div>
        );
    }
}
