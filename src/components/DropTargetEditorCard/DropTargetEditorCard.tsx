import * as React from 'react';
const DragDrop: any = require('react-dnd');
const DropTarget: any = DragDrop.DropTarget;
const classNames:any = require('classnames');
import DraggableEditorCard from '../DraggableEditorCard/DraggableEditorCard';
import DropTargetEditorCardButton from '../DropTargetEditorCardButton/DropTargetEditorCardButton';
import {Card as CardClass} from '../../classes/Card';

export const ItemTypes = {
    EDITOR_CARD: 'editorCard'
};

const editorCardTarget = {
  drop(props: IDropTargetEditorCardProps, monitor: any) {
      console.log('dropped...');
      return {
          boop: 'woop'
      }
  },
  hover(props: IDropTargetEditorCardProps) {
      const cardMightBeDropped = props.cardMightBeDropped;
      // cardMightBeDropped();
  }
};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface IDropTargetEditorCardProps {
    card: CardClass,
    cardMightBeDropped(): void,
    cardDropButtonHovered(index: number): void,
    cardDropButtonUnhovered(index: number): void,
    beginDrag(): void,
    endDrag(): void,
    moveCard(card: CardClass, fromIndex: number, toIndex: number, toColumnId: string): void,
    connectDropTarget: any,
    columnId: string,
    isOver: boolean,
    index: number
}

interface IDropTargetEditorCardState {
    bottomDropButtonHovered?: boolean,
    topDropButtonHovered?: boolean,
}

class DropTargetEditorCard extends React.Component<IDropTargetEditorCardProps, IDropTargetEditorCardState> {
    constructor(props:IDropTargetEditorCardProps) {
        super(props);
        this.state = {
            bottomDropButtonHovered: false,
            topDropButtonHovered: false
        };
        this.dropButtonHovered = this.dropButtonHovered.bind(this);
        this.dropButtonUnhovered = this.dropButtonUnhovered.bind(this);
    }
    componentWillReceiveProps(nextProps: IDropTargetEditorCardProps) {
        // console.log('props comparison', this.props, nextProps);
    }
    dropButtonHovered(position: 'top' | 'bottom') {
        console.log('drop button hovered');
        let index = this.props.index;
        if(position === 'top') {
            this.setState({
                topDropButtonHovered: true
            });
            index--;
        } else {
            this.setState({
                bottomDropButtonHovered: true
            });
            index++;
        }
        this.props.cardDropButtonHovered(index);
    }
    dropButtonUnhovered(position: 'top' | 'bottom') {
        let index = this.props.index;
        if(position === 'top') {
            this.setState({
                topDropButtonHovered: false
            });
            index--;
        } else {
            this.setState({
                bottomDropButtonHovered: false
            });
            index++;
        }
        this.props.cardDropButtonUnhovered(index);
    }
    render() {
        const cardMightBeDropped = this.props.cardMightBeDropped;
        const connectDropTarget = this.props.connectDropTarget;
        const card = this.props.card;
        const columnId = this.props.columnId;
        const index = this.props.index;
        const beginDrag = this.props.beginDrag;
        const endDrag = this.props.endDrag;
        const moveCard = this.props.moveCard;
        const bottomDropButtonHovered = this.state.bottomDropButtonHovered;
        const topDropButtonHovered = this.state.topDropButtonHovered;
        const isOver = this.props.isOver;
        const draggableClassNames = classNames([
            'dropTargetEditorCard',
            {
                'dropTargetEditorCard--isOver': isOver,
                'dropTargetEditorCard--topButtonHovered': topDropButtonHovered,
                'dropTargetEditorCard--bottomButtonHovered': bottomDropButtonHovered,
            }
        ]);
        return (
                connectDropTarget(
                    <div className={draggableClassNames}>
                        {/*<DropTargetEditorCardButton*/}
                            {/*index={index}*/}
                            {/*columnId={columnId}*/}
                            {/*dropButtonHovered={this.dropButtonHovered} dropButtonUnhovered={this.dropButtonUnhovered}*/}
                            {/*position={'top'}/>*/}
                        <DraggableEditorCard card={card}
                                             index={index}
                                             beginDrag={beginDrag}
                                             endDrag={endDrag}
                                             moveCard={moveCard}>
                            {this.props.children}
                        </DraggableEditorCard>
                        <DropTargetEditorCardButton
                            index={index}
                            columnId={columnId}
                            dropButtonHovered={this.dropButtonHovered} dropButtonUnhovered={this.dropButtonUnhovered}
                            position={'bottom'}/>
                    </div>
                )
        );
    }
}


export default DropTarget('', editorCardTarget, collect)(DropTargetEditorCard);