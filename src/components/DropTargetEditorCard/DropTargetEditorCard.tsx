import * as React from 'react';
const DragDrop: any = require('react-dnd');
const DropTarget: any = DragDrop.DropTarget;
const classNames:any = require('classnames');

export const ItemTypes = {
    EDITOR_CARD: 'editorCard'
};

const editorCardTarget = {
  drop(props: any, monitor: any) {
      console.log('dropped?');
  }
};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface IDropTargetEditorCardProps {
    connectDropTarget: any,
    isOver: boolean
}

class DropTargetEditorCard extends React.Component<IDropTargetEditorCardProps, {}> {
    render() {
        const connectDropTarget = this.props.connectDropTarget;
        const isOver = this.props.isOver;
        const draggableClassNames = classNames([
            'dropTargetEditorCard',
            {
                'dropTargetEditorCard--isOver': isOver
            }
        ]);
        return connectDropTarget(
            <div className={draggableClassNames}>
                {this.props.children}
            </div>
        );
    }
}


export default DropTarget(ItemTypes.EDITOR_CARD, editorCardTarget, collect)(DropTargetEditorCard);