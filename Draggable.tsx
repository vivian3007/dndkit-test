import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export default function Draggable({id, position}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });

    console.log(id);

    const style = {
        width: "150px",
        height: "150px",
        backgroundColor: id,
        cursor: "pointer",
        position: "absolute",
        transform: transform
            ? `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            Draggable
        </button>
    );
}