import React, {useEffect, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import Draggable from "./Draggable";
import "./styles.css";

const draggables = ["red", "blue", "yellow", "green"]
export const GRID_SIZE = 50;
export const BLOCK_SIZE = 150;

export default function App (){
    const [highlightedCells, setHighlightedCells] = useState([]);
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

    const checkOverlap = (id, targetX, targetY) => {
        for (const otherId of draggables) {
            if (otherId === id) continue;

            const otherPos = positions[otherId];
            const otherCells = [];
            for (let x = otherPos.x; x < otherPos.x + BLOCK_SIZE; x += GRID_SIZE) {
                for (let y = otherPos.y; y < otherPos.y + BLOCK_SIZE; y += GRID_SIZE) {
                    otherCells.push({ x, y });
                }
            }

            const targetCells = [];
            for (let x = targetX; x < targetX + BLOCK_SIZE; x += GRID_SIZE) {
                for (let y = targetY; y < targetY + BLOCK_SIZE; y += GRID_SIZE) {
                    targetCells.push({ x, y });
                }
            }

            for (const targetCell of targetCells) {
                for (const otherCell of otherCells) {
                    if (targetCell.x === otherCell.x && targetCell.y === otherCell.y) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const handleDragMove = (event) => {
        const { active, delta } = event;
        const id = active.id;

        const currentX = positions[id].x + delta.x;
        const currentY = positions[id].y + delta.y;

        const snappedX = Math.round(currentX / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(currentY / GRID_SIZE) * GRID_SIZE;

        const cells = [];
        for (let x = snappedX; x < snappedX + BLOCK_SIZE; x += GRID_SIZE) {
            for (let y = snappedY; y < snappedY + BLOCK_SIZE; y += GRID_SIZE) {
                cells.push({ x, y, isOverlap: checkOverlap(id, snappedX, snappedY) });
            }
        }

        setHighlightedCells(cells);
    };

    const handleDragEnd = (event) => {
        const { active, delta } = event;
        const id = active.id;

        const newX = positions[id].x + delta.x;
        const newY = positions[id].y + delta.y;
        const snappedX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

        if (!checkOverlap(id, snappedX, snappedY)) {
            setPositions((prev) => ({
                ...prev,
                [id]: {
                    x: snappedX,
                    y: snappedY,
                },
            }));
        }
        setHighlightedCells([]);
    };

    return (
        <div className="dnd-container">
            <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
                {highlightedCells.map((cell, index) => (
                    <div
                        key={`highlight-${cell.x}-${cell.y}`}
                        className={cell.isOverlap ? "grid-highlight-overlap" : "grid-highlight"}
                        style={{
                            left: cell.x,
                            top: cell.y,
                            width: GRID_SIZE,
                            height: GRID_SIZE,
                        }}
                    />
                ))}
                {draggables.map((draggable) => {
                    return (<Draggable id={draggable} position={positions[draggable]}/>)
                })}
            </DndContext>
        </div>
    );
}