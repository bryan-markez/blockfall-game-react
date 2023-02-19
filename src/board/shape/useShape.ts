import React, { useState } from "react"
import { randomShape } from "./Shape"
import { IShapePosition } from "./Shape.interfaces"

export const useShape = () => {
    const [shape, setShape] = useState<IShapePosition>({shape: randomShape(), position: {x: 3, y: 0}, state: 1})
    const [oldShape, setOldShape] = useState<IShapePosition|null>(null)

    // TODO implement 7 bag randomizer

    const moveShape = (x: number, y: number) => {
        setOldShape(structuredClone(shape))
        setShape({ ...shape, position: { x: shape.position.x + x, y: shape.position.y + y } })
    }

    const rotateShape = (ccw = false) => {
        setOldShape(structuredClone(shape))
        if (ccw) {
            setShape({ ...shape, state: shape.state === 1 ? 4 : shape.state - 1 })
        } else {
            setShape({ ...shape, state: shape.state === 4 ? 1 : shape.state + 1 })
        }
    }

    const getNewShape = () => {
        setOldShape(null)
        setShape({shape: randomShape(), position: {x: 3, y: 0}, state: 1})
    }

    return [shape, oldShape, moveShape, rotateShape, getNewShape] as const
}