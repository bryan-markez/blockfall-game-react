import { useEffect, useState } from "react"

import { useInterval } from "../loop/Loop"

export const ROW_COUNT = 20
export const COL_COUNT = 10

interface IPosition {
    x: number
    y: number
}

interface IShape {
    shape: Array<IPosition>
    width: number
    height: number
}

const O_SHAPE: IShape = {
    shape: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ],
    width: 2,
    height: 2
}

const createEmptyScene = (): number[][] => {
    return Array.from(Array(ROW_COUNT), () => new Array(COL_COUNT).fill(0))
}

const updateBoard = (scene: number[][], position: IPosition, value: number): number[][] => {
    if (scene[position.y][position.x] === value) {
        return scene
    }

    const updatedScene = scene.slice()
    updatedScene[position.y] = scene[position.y].slice()
    updatedScene[position.y][position.x] = value

    return updatedScene
}


const updateBoardByShape = (scene: number[][], currentShape: IShape, position: IPosition): number[][] => {
    let updatedScene = scene.slice()

    currentShape.shape.forEach((pos) => {
        updatedScene = updateBoard(updatedScene, { x: pos.x + position.x, y: pos.y + position.y }, 1)
    })

    return updatedScene
}

export const useBoard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scene, setScene] = useState<number[][]>(createEmptyScene())
    const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [shape, setShape] = useState<IShape>(O_SHAPE)
    const [board, setBoard] = useState<number[][]>(updateBoardByShape(scene, shape, position))

    const moveShape = (x: number, y: number): boolean => {
        const updatedPosition: IPosition = {
            x: position.x + x,
            y: position.y + y
        }
        
        if (validateMove(updatedPosition)) {
            setPosition(updatedPosition)
            return true
        } else {
            return false
        }

    }

    const validateMove = (newPosition: IPosition): boolean => {
        // get absolute position of each block
        const absoluteShape = shape.shape.map((pos) => {        
            return { x: pos.x + newPosition.x, y: pos.y + newPosition.y }
        })

        // check if any block is out of bounds
        const outOfBounds = absoluteShape.some((pos) => {
            return pos.x < 0 || pos.x >= COL_COUNT || pos.y < 0 || pos.y >= ROW_COUNT
        })
        console.log("outOfBounds", outOfBounds)

        if (outOfBounds) {
            return false
        }

        // check if any block is colliding with another block
        const colliding = absoluteShape.some((pos) => {
            return scene[pos.y][pos.x] === 1
        })

        if (colliding) {
            return false
        }

        return true
    }

    const updateBoardState = () => {
        const updatedBoard = updateBoardByShape(scene, shape, position)
        setBoard(updatedBoard)
    }

    useEffect(updateBoardState, [scene, shape, position])

    // Piece falling loop
    useInterval(() => {
        if (moveShape(0, 1)) {
            console.log("move down")
        } else {
            console.log("cannove move down")
        }

    }, 600)


    return [board]
}