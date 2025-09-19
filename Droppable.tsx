import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props) {
    const {setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        position: "relative",
        width: "100vw",
        height: "100vh",
        border: "1px dashed #ccc",
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}