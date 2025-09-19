import React, {useState} from "react";
import {DndContext} from "@dnd-kit/core";
import Draggable from "./Draggable";

const draggables = ["red", "blue", "yellow", "green"]

export default function App (){
    const [positions, setPositions] = useState({
        red: { x: 0, y: 0 },
        blue: { x: 0, y: 0 },
        yellow: { x: 0, y: 0 },
        green: { x: 0, y: 0 },
    });
    const handleDragEnd = (event) => {
        const { active, delta } = event;
        const id = active.id;

        setPositions((prev) => ({
            ...prev,
            [id]: {
                x: prev[id].x + delta.x,
                y: prev[id].y + delta.y,
            },
        }));
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {draggables.map((draggable) => {
                return (<Draggable id={draggable} position={positions[draggable]}/>)
            })}
        </DndContext>
    );
}