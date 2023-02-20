import React, { useState, useEffect, useCallback } from "react"
import { useShape } from "./shape/useShape"
import { useLoop } from "./useLoop"
import { useKey } from "./device/useKeyboard"
import { IShapePosition, IShapeState } from "./shape/Shape.interfaces"
import { IPosition } from "./Board.interfaces"

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

    const validatePlacement = (spawnedShape: IShapePosition, boardPreview?: [][]): boolean => {
        let validMoveFlag = true
        // todo not used for not but it might be useful for later
        const updatedBoardPreview: number[][] = structuredClone((boardPreview) ? boardPreview : board)
        const spawnedShapedPreview: IShapePosition = structuredClone(spawnedShape)

        const currentShapeValues = spawnedShapedPreview.shape.states[spawnedShapedPreview.state as keyof IShapeState]

        for (const shapePos of currentShapeValues) {
            const x = shapePos.x + spawnedShapedPreview.position.x
            const y = shapePos.y + spawnedShapedPreview.position.y

            if (x < 0 || y < 0 || x >= COL_COUNT || y >= ROW_COUNT) {
                validMoveFlag = false
                break
            }

            // check if board is occupied in the first 2 rows
            if (y < 2) {
                validMoveFlag = false
                break
            }
        }

        return validMoveFlag
    }

    // validate the next move
    const validateMove = (movePos: IPosition): boolean => {
        let validMoveFlag = true
        const updatedBoardPreview: number[][] = structuredClone(board)

        // need the current shape in order to clean up the board
        const currentShape: IShapePosition = structuredClone(shape)

        const currentShapeValues = currentShape.shape.states[currentShape.state as keyof IShapeState]

        currentShapeValues.forEach((shapePos) => {
            updatedBoardPreview[shapePos.y + currentShape.position.y][shapePos.x + currentShape.position.x] = 0
        })

        const newShapePosition = currentShape.position
        newShapePosition.x += movePos.x
        newShapePosition.y += movePos.y


        for (const shapePos of currentShapeValues) {
            const x = shapePos.x + newShapePosition.x
            const y = shapePos.y + newShapePosition.y

            if (x < 0 || y < 0 || x >= COL_COUNT || y >= ROW_COUNT) {
                validMoveFlag = false
                break
            }

            if (updatedBoardPreview[y][x] !== 0) {
                validMoveFlag = false
                break
            }
        }

        return validMoveFlag
    }

    const validateRotation = (ccw = false): boolean => {
        let validMoveFlag = true
        const updatedBoardPreview: number[][] = structuredClone(board)

        // need the current shape in order to clean up the board
        const currentShape: IShapePosition = structuredClone(shape)

        const currentShapeValues = currentShape.shape.states[currentShape.state as keyof IShapeState]

        currentShapeValues.forEach((shapePos) => {
            updatedBoardPreview[shapePos.y + currentShape.position.y][shapePos.x + currentShape.position.x] = 0
        })

        const newShapePosition = currentShape.position

        const newShapeState = ccw ? (currentShape.state === 1 ? 4 : currentShape.state - 1) : (currentShape.state === 4 ? 1 : currentShape.state + 1)
        const newShapeValues = currentShape.shape.states[newShapeState as keyof IShapeState]
        
        for (const shapePos of newShapeValues) {
            const x = shapePos.x + newShapePosition.x
            const y = shapePos.y + newShapePosition.y

            if (x < 0 || y < 0 || x >= COL_COUNT || y >= ROW_COUNT) {
                validMoveFlag = false
                break
            }

            if (updatedBoardPreview[y][x] !== 0) {
                validMoveFlag = false
                break
            }
        }

        return validMoveFlag
    }

    const tryMove = (x: number, y: number) => {
        let flag = false

        if (validateMove({x, y})) {
            const newShape = moveShape(x, y)
            placeShape(board, newShape, {shapesToClean: [shape]})

            flag = true
        }

        return flag
    }

    const tryRotate = (ccw = false) => {
        let flag = false

        if (validateRotation(ccw)) {
            const newShape = rotateShape(ccw)
            placeShape(board, newShape, {shapesToClean: [shape]})
            flag = true
        }

        return flag
    }

    type IUpdateBoardOptions = {
        cleanUp: boolean
        updateImmediately: boolean
    }

    const updateBoard = (incomingBoard: number[][], incomingShape: IShapePosition | null, opts: IUpdateBoardOptions) => {
        const { cleanUp, updateImmediately } = opts

        // making a full clone for safety, would need to evaluate if this is causing performance issues later
        const updatedBoard: number[][] = structuredClone(incomingBoard)
        const updatedShape: IShapePosition = structuredClone(incomingShape)

        if (updatedShape === null) {
            return updatedBoard
        }

        const updatedShapeValues = updatedShape.shape.states[updatedShape.state as keyof IShapeState]

        updatedShapeValues.forEach((shapePos) => {
            updatedBoard[shapePos.y + updatedShape.position.y][shapePos.x + updatedShape.position.x] = (cleanUp) ? 0 : updatedShape.shape.value
        })

        if (updateImmediately) {
            setBoard(updatedBoard)
        }

        return updatedBoard
    }

    type IPlaceShapeOptions = {
        shapesToClean?: IShapePosition[]
        spawnNewShape?: boolean
        lockShape?: boolean
    }

    const placeShape = (board: number[][], shape: IShapePosition, opts: IPlaceShapeOptions = {}): number[][] => {
        const shapesToClean: IShapePosition[] | undefined = opts.shapesToClean
        const spawnNewShape: boolean | undefined = opts.spawnNewShape
        const lockedShape: boolean | undefined = opts.lockShape

        let updatedBoard = structuredClone(board)

        if (shapesToClean && shapesToClean.length > 0) {
            shapesToClean.forEach((shapeToClean) => {
                updatedBoard = updateBoard(updatedBoard, shapeToClean, {cleanUp: true, updateImmediately: false})
            })
        }

        if (lockedShape) {
            if (validatePlacement(shape, updatedBoard)) {
                updatedBoard = updateBoard(updatedBoard, shape, {cleanUp: false, updateImmediately: true})
            } else {
                setGameOver(true)
                return updatedBoard
            }
        } else {
            updatedBoard = updateBoard(updatedBoard, shape, {cleanUp: false, updateImmediately: true})

        }

        if (spawnNewShape) {
            const newShape = getNewShape()
            updatedBoard = updateBoard(updatedBoard, newShape, {cleanUp: false, updateImmediately: true})
        }

        return updatedBoard
    }

    const hardDrop = () => {
        const currentBoard = structuredClone(board)
        const currentShape = structuredClone(shape)

        const newMovePos = {x: 0, y: 0}
        while (validateMove(newMovePos)) {
            newMovePos.y++
        }

        const updatedShape = {...currentShape, position: {
            x: newMovePos.x + currentShape.position.x,
            y: currentShape.position.y + newMovePos.y - 1
        }}
        
        placeShape(currentBoard, updatedShape, {shapesToClean: [currentShape], spawnNewShape: true, lockShape: true})
    }

    // in game timer (piece gravity)
    const gravityLoop = useCallback(() => {
        // check if the shape can still move down
        if (!gameOverFlag) {
            if (tryMove(0, 1)) {
                console.log("move down")
            } else {
                placeShape(board, shape, {spawnNewShape: true, lockShape: true})
            }
        }

    }, [tryMove, getNewShape, gameOverFlag])

    useKey(tryMove, "ArrowLeft", [-1, 0])
    useKey(tryMove, "ArrowRight", [1, 0])
    useKey(tryMove, "ArrowDown", [0, 1])
    useKey(tryMove, "ArrowUp", [0, -1])
    useKey(hardDrop, " ")
    useKey(tryRotate, "s", [true])
    useKey(tryRotate, "f", [false])
    useKey(tryMove, "l", [-1, 0])
    useKey(tryMove, "'", [1, 0])
    useKey(tryMove, ";", [0, 1])
    useKey(hardDrop, "p")

    useEffect(() => {
        if (gameOverFlag) {
            const newBoard = createEmptyBoard(ROW_COUNT, COL_COUNT)
            placeShape(newBoard, resetShape())
            setGameOver(false)
        }
    }, [gameOverFlag])

    useLoop(gravityLoop, 600)

    return [board, gameOverFlag] as const
}