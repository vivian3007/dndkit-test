import React, {useEffect, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import Draggable from "./Draggable";

const draggables = ["red", "blue", "yellow", "green"]

export default function App (){
    const [positions, setPositions] = useState(() => {
        const savedPositions = localStorage.getItem("draggablePositions");
        return savedPositions ? JSON.parse(savedPositions) : {
            red: { x: 0, y: 0 },
            blue: { x: 0, y: 0 },
            yellow: { x: 0, y: 0 },
            green: { x: 0, y: 0 },
        };
    });

    useEffect(() => {
        localStorage.setItem("draggablePositions", JSON.stringify(positions));
    }, [positions]);

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