import * as React from 'react';
const DragDrop: any = require('react-dnd');
const DragSource: any = DragDrop.DragSource;
const DropTarget: any = DragDrop.DropTarget;
const classNames:any = require('classnames');
import {IDropResults} from '../DropTargetEditorCardButton/DropTargetEditorCardButton';
import {Card as CardClass} from '../../classes/Card';

export const ItemTypes = {
    EDITOR_CARD: 'editorCard'
};

const editorCardSource = {
  beginDrag(props: IDraggableEditorCardProps) {
      props.beginDrag();
      return {};
  },
  endDrag(props: IDraggableEditorCardProps, monitor: any) {
      const dropResult: IDropResults = monitor.getDropResult();
      console.log('drop result', dropResult);
      if(dropResult) {
          props.moveCard(props.card, props.index, dropResult.index, dropResult.columnId);
      }
      props.endDrag();
  }
};

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

interface IDraggableEditorCardProps {
    card: CardClass,
    index: number,
    beginDrag(): void,
    endDrag(): void,
    moveCard(card: CardClass, fromIndex: number, toIndex: number, toColumnId: string): void,
    connectDragSource: any,
    isDragging: boolean,
}

class DraggableEditorCard extends React.Component<IDraggableEditorCardProps, {}> {
    componentWillReceiveProps(nextProps: IDraggableEditorCardProps) {
        // if(!this.props.isDragging && nextProps.isDragging) {
        //     this.props.beginDrag();
        // } else if(this.props.isDragging && !nextProps.isDragging) {
        //     this.props.endDrag();
        // }
    }
    render() {
        const connectDragSource = this.props.connectDragSource;
        const isDragging = this.props.isDragging;
        const draggableClassNames = classNames([
            'draggableEditorCard',
            {
                'draggableEditorCard--isDragging': isDragging
            }
        ]);
        return (
            connectDragSource(
                <div className={draggableClassNames}>
                    {this.props.children}
                </div>
            )
        );
    }
}


export default DragSource(ItemTypes.EDITOR_CARD, editorCardSource, collect)(DraggableEditorCard);