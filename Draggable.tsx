import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {BLOCK_SIZE} from "./App";

export default function Draggable({id, position}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });

    console.log(id);

    const style = {
        width: `${BLOCK_SIZE}px`,
        height: `${BLOCK_SIZE}px`,
        backgroundColor: id,
        cursor: "grab",
        position: "absolute",
        touchAction: "none",
        transform: transform
            ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {id}
        </button>
    );
}