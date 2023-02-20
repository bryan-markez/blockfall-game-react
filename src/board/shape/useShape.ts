import React, { useState } from "react"
import { randomShape } from "./Shape"
import { IShapePosition, IShape } from "./Shape.interfaces"
import { useBag } from "./useBag"


export const useShape = () => {
    const [oldShape, setOldShape] = useState<IShapePosition|null>(null)
    const [shape, setShape] = useState<IShapePosition>({shape: randomShape(), position: {x: 3, y: 0}, state: 1})
    const [savedBag] = useBag(shape.shape)

    const takeFromBag = (): IShape => {
        const newShape = savedBag.current[0]
        savedBag.current = savedBag.current.slice(1)

        return newShape
    }

    const getNewShape = () => {
        setOldShape(null)
        setShape({shape: takeFromBag(), position: {x: 3, y: 0}, state: 1})
    }

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

    return [shape, oldShape, moveShape, rotateShape, getNewShape] as const
}