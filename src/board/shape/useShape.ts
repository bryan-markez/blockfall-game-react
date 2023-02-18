import React, { useState } from "react"
import { randomShape } from "./Shape"
import { IShapePosition } from "./Shape.interfaces"

export const useShape = () => {
    const [shape, setShape] = useState<IShapePosition>({shape: randomShape(), position: {x: 0, y: 0}, state: 1})
    const [oldShape, setOldShape] = useState<IShapePosition|null>(null) 

    const moveShape = (x: number, y: number) => {
        setOldShape(shape)
        setShape({ ...shape, position: { x: shape.position.x + x, y: shape.position.y + y } })
    }

    const rotateShape = (ccw = false) => {
        setOldShape(shape)
        if (ccw) {
            setShape({ ...shape, state: shape.state === 1 ? 4 : shape.state - 1 })
        } else {
            setShape({ ...shape, state: shape.state === 4 ? 1 : shape.state + 1 })
        }
    }

    const getNewShape = () => {
        setOldShape(shape)
        setShape({shape: randomShape(), position: {x: 0, y: 0}, state: 1})
    }

    return [shape, oldShape, moveShape, rotateShape, getNewShape] as const
}