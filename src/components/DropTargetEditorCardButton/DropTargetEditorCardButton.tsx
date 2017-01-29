import * as React from 'react';
const DragDrop: any = require('react-dnd');
const DropTarget: any = DragDrop.DropTarget;
const classNames:any = require('classnames');

export interface IDropResults {
    columnId: string,
    index: number
}

const ItemTypes = {
    EDITOR_CARD: 'editorCard'
};

const editorCardTarget = {
  drop(props: IDropTargetEditorCardButtonProps, monitor: any) {
      const columnId = props.columnId;
      const index = (props.position === 'top') ? props.index : props.index + 1;
      const results: IDropResults = {
          columnId,
          index
      };
      return results;
  },
  hover(props: IDropTargetEditorCardButtonProps) {
  }
};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

interface IDropTargetEditorCardButtonProps {
    dropButtonHovered(position: 'top' | 'bottom'): void,
    dropButtonUnhovered(position: 'top' | 'bottom'): void,
    columnId: string,
    index: number,
    position: 'top'|'bottom',
    connectDropTarget: any,
    isOver: boolean
}

class DropTargetEditorCardButton extends React.Component<IDropTargetEditorCardButtonProps, {}> {
    componentWillReceiveProps(nextProps: IDropTargetEditorCardButtonProps) {
        if(!this.props.isOver && nextProps.isOver) {
            this.props.dropButtonHovered(this.props.position);
        } else if (this.props.isOver && !nextProps.isOver) {
            this.props.dropButtonUnhovered(this.props.position);
        }
    }
    render() {
        const connectDropTarget = this.props.connectDropTarget;
        const isOver = this.props.isOver;
        const position = this.props.position;
        const droppableClassNames = classNames([
            'dropTargetEditorCardButton',
            'dropTargetEditorCardButton--' + position,
            {
                'dropTargetEditorCardButton--isOver': isOver
            }
        ]);
        return (
                connectDropTarget(
                    <div className={droppableClassNames}>
                        <span className='dropTargetEditorCardButton__text'>
                            move here
                        </span>
                    </div>
                )
        );
    }
}


export default DropTarget(ItemTypes.EDITOR_CARD, editorCardTarget, collect)(DropTargetEditorCardButton);