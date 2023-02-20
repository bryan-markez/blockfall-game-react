import React, { useState } from "react"
import { randomShape } from "./Shape"
import { IShapePosition, IShape } from "./Shape.interfaces"
import { useBag } from "./useBag"


export const useShape = () => {
    const [shape, setShape] = useState<IShapePosition>({shape: randomShape(), position: {x: 3, y: 0}, state: 1})
    const [savedBag, resetBag] = useBag(shape.shape)

    const takeFromBag = (): IShape => {
        const newShape = savedBag.current[0]
        savedBag.current = savedBag.current.slice(1)

        return newShape
    }

    const getNewShape = (): IShapePosition => {
        const newShape = {shape: takeFromBag(), position: {x: 3, y: 0}, state: 1}
        setShape(newShape)
        return newShape
    }

    const moveShape = (x: number, y: number): IShapePosition => {
        const newShape = {...shape, position: { x: shape.position.x + x, y: shape.position.y + y }}
        setShape(newShape)
        return newShape
    }

    const rotateShape = (ccw = false): IShapePosition => {
        const newShape = {...shape}
        if (ccw) {
            newShape.state = newShape.state === 1 ? 4 : newShape.state - 1
        } else {
            newShape.state = newShape.state === 4 ? 1 : newShape.state + 1
        }
        setShape(newShape)
        return newShape
    }

    const resetShape = (): IShapePosition => {
        const newFirstShape: IShapePosition = {shape: randomShape(), position: {x: 3, y: 0}, state: 1}
        setShape(newFirstShape)
        resetBag(newFirstShape.shape)
        return newFirstShape
    }

    return [shape, moveShape, rotateShape, getNewShape, resetShape] as const
}