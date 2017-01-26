import * as React from 'react';
const DragDrop: any = require('react-dnd');
const DragSource: any = DragDrop.DragSource;
const DropTarget: any = DragDrop.DropTarget;
const classNames:any = require('classnames');
import DropTargetEditorCard from '../DropTargetEditorCard/DropTargetEditorCard';

export const ItemTypes = {
    EDITOR_CARD: 'editorCard'
};

const editorCardSource = {
  beginDrag(props: any) {
      console.log('dragging just began...');
      return {};
  }
};

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

interface IDraggableEditorCardProps {
    connectDragSource: any,
    isDragging: boolean,
}

class DraggableEditorCard extends React.Component<IDraggableEditorCardProps, {}> {
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
            <DropTargetEditorCard>
                {connectDragSource(
                        <div className={draggableClassNames}>
                            {this.props.children}
                        </div>
                )}
            </DropTargetEditorCard>
        );
    }
}


export default DragSource(ItemTypes.EDITOR_CARD, editorCardSource, collect)(DraggableEditorCard);