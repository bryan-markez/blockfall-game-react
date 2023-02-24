import React, { useState, useEffect, useCallback } from "react"
import { useShape } from "./shape/useShape"
import { useLoop } from "./useLoop"
import { useKey } from "./device/useKeyboard"
import { useScoreSystem } from "./useScoreSystem"
import { IShapePosition, IShapeState } from "./shape/Shape.interfaces"

export const ROW_COUNT = 20
export const COL_COUNT = 10

const createEmptyBoard = (x: number, y: number): number[][] => {
    const board: number[][] = Array.from(Array(x), () => new Array(y).fill(0))
    return board
}

export const useBoard = (gameId: number) => {
    const [board, setBoard] = useState<number[][]>(createEmptyBoard(ROW_COUNT, COL_COUNT))
    const [shape, moveShape, rotateShape, getNewShape, resetShape] = useShape()
    const [gameOverFlag, setGameOver] = useState<boolean>(false)
    const [score, backToBack, combo, updateScoreByLineClear, resetScore] = useScoreSystem()
    const [ghostShape, setGhostShape] = useState<IShapePosition | null>(null)

    // new shape placement logic
    const validateShapePlacement = (shape: IShapePosition, board: number[][], checkGameOver = false): boolean => {
        // todo turn checkGameOver into an option
        
        const currentBoard: number[][] = structuredClone(board)
        const currentShape: IShapePosition = structuredClone(shape)
        let valid = true

        for (const shapePos of currentShape.shape.states[currentShape.state as keyof IShapeState]) {
            const x = shapePos.x + currentShape.position.x
            const y = shapePos.y + currentShape.position.y

            if (x < 0 || y < 0 || x >= COL_COUNT || y >= ROW_COUNT) {
                valid = false
                break
            }

            if (currentBoard[y][x] !== 0) {
                valid = false
                break
            }

            if (checkGameOver && y < 2) {
                valid = false
                break
            }
        }

        return valid
    }

    const hardDrop = (): IShapePosition => {
        const currentBoard: number[][] = structuredClone(board)
        const currentShape: IShapePosition = structuredClone(shape)

        const newShape = structuredClone(currentShape)
        while (validateShapePlacement(newShape, currentBoard)) {
            newShape.position.y++
        }

        // move the shape back up one row since that last execution of the while loop will have failed
        newShape.position.y--

        const finalShape = moveShape(0, newShape.position.y - currentShape.position.y)
        return lockShape(finalShape)
    }

    const moveShapeInBoard = (x: number, y: number): IShapePosition => {
        let newShape: IShapePosition = moveShape(x, y, false)

        if (validateShapePlacement(newShape, board)) {
            newShape = moveShape(x, y)
            return newShape
        } else {
            return shape
        }
    }

    const rotateShapeInBoard = (ccw: boolean): IShapePosition => {
        let newShape: IShapePosition = structuredClone(shape)
        newShape = rotateShape(ccw, false) // false because we don't want to update the board yet

        if (validateShapePlacement(newShape, board)) {
            newShape = rotateShape(ccw, true) // true because we want to update the board now
            return newShape
        } else {
            return shape
        }
    }

    const updateBoard = (board: number[][], shape: IShapePosition) => {
        // making a full clone for safety, would need to evaluate if this is causing performance issues later
        const updatedBoard: number[][] = structuredClone(board)
        const updatedShape: IShapePosition = structuredClone(shape)

        const updatedShapeValues = updatedShape.shape.states[updatedShape.state as keyof IShapeState]

        updatedShapeValues.forEach((shapePos) => {
            updatedBoard[shapePos.y + updatedShape.position.y][shapePos.x + updatedShape.position.x] = updatedShape.shape.value
        })

        // checking for line clears
        let lineClears = 0
        for (const row of updatedBoard) {
            if (row.every((value) => value !== 0)) {
                const rowToClear = updatedBoard.indexOf(row)
                updatedBoard.splice(rowToClear, 1)
                updatedBoard.unshift(new Array(COL_COUNT).fill(0))
                lineClears += 1
            }
        }
        updateScoreByLineClear(lineClears, false)

        setBoard(updatedBoard)

        return updatedBoard
    }

    const lockShape = (newShape?: IShapePosition): IShapePosition => {
        const currentBoard: number[][] = structuredClone(board)
        const currentShape: IShapePosition = structuredClone((newShape) ? newShape : shape)

        // checking for game over
        if (!validateShapePlacement(currentShape, currentBoard, true)) {
            setGameOver(true)
            resetScore()
            return currentShape
        }

        updateBoard(currentBoard, currentShape)

        // Spawn new shape 
        return getNewShape()
    }

    const move = (x: number, y: number) => {
        moveShapeInBoard(x, y)
    }
    const rotate = (ccw: boolean) => {
        rotateShapeInBoard(ccw)
    }
    useKey(move, "ArrowLeft", [-1, 0])
    useKey(move, "ArrowRight", [1, 0])
    useKey(move, "ArrowDown", [0, 1])
    useKey(hardDrop, " ")
    useKey(rotate, "s", [true])
    useKey(rotate, "f", [false])
    useKey(move, "l", [-1, 0])
    useKey(move, "'", [1, 0])
    useKey(move, ";", [0, 1])
    useKey(hardDrop, "p")

    // TODO Will reenable this when we have a proper game over screen. For now, restart your browser :)
    // useEffect(() => {
    //     if (gameOverFlag) {
    //         const newBoard = createEmptyBoard(ROW_COUNT, COL_COUNT)
    //         placeShape(newBoard, resetShape())
    //         setGameOver(false)
    //     }
    // }, [gameOverFlag])

    // in game timer (piece gravity)
    const gravityLoop = useCallback(() => {
        // check if the shape can still move down
        if (!gameOverFlag) {
            if (validateShapePlacement(moveShape(0, 1, false), board)) {
                moveShape(0, 1)
                console.log("move down")
            } else {
                lockShape()
            }
        }

    }, [validateShapePlacement, lockShape, moveShape])

    useLoop(gravityLoop, 600)

    // ghost piece indicator
    useEffect(() => {
        if (shape) {
            const currentBoard = structuredClone(board)
            const currentShape = structuredClone(shape)

            const newShape = structuredClone(currentShape)
            while (validateShapePlacement(newShape, currentBoard)) {
                newShape.position.y++
            }
            // move the shape back up one row since that last execution of the while loop will have failed
            newShape.position.y--
            
            setGhostShape(newShape)
        }
    }, [board, shape])

    return [board, shape, gameOverFlag, score, combo, backToBack, ghostShape] as const
}