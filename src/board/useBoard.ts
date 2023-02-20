import React, { useState, useEffect, useCallback } from "react"
import { useShape } from "./shape/useShape"
import { useLoop } from "./useLoop"
import { IShapePosition, IShapeState } from "./shape/Shape.interfaces"
import { IPosition } from "./Board.interfaces"

export const ROW_COUNT = 20
export const COL_COUNT = 10

const createEmptyBoard = (x: number, y: number): number[][] => {
    const board: number[][] = Array.from(Array(x), () => new Array(y).fill(0))
    return board
}

export const useBoard = () => {
    const [board, setBoard] = useState<number[][]>(createEmptyBoard(ROW_COUNT, COL_COUNT))
    const [placeShapeFlag, setPlaceShapeFlag] = useState<boolean>(false) // used to trigger the placement of a new shape
    const [shape, oldShape, moveShape, rotateShape, getNewShape] = useShape()

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
            moveShape(x, y)
            flag = true
        }

        return flag
    }

    const tryRotate = (ccw = false) => {
        let flag = false

        if (validateRotation(ccw)) {
            rotateShape(ccw)
            flag = true
        }

        return flag
    }

    const hardDrop = () => {
        const newMovePos = {x: 0, y: 0}

        while (validateMove(newMovePos)) {
            newMovePos.y++
        }

        const finalPos = {x: newMovePos.x + shape.position.x, y: shape.position.y + newMovePos.y - 1 }
        console.log("finalPos ", finalPos)

        // TODO this is super hacking pls improve
        const updatedBoardRes = updateBoard(board, {...shape}, {cleanUp: true, updateImmediately: false})
        updateBoard(updatedBoardRes, {...shape, position: {x: finalPos.x, y: finalPos.y}}, {cleanUp: false, updateImmediately: true})

        getNewShape()

    }

    const onKeyDown = (e: KeyboardEvent) => {
        // console.log("KeyDown: ", e)
        switch (e.key) {
        case "ArrowLeft":
            tryMove(-1, 0)
            break
        case "ArrowRight":
            tryMove(1, 0)
            break
        case "ArrowDown":
            tryMove(0, 1)
            break
        case "ArrowUp":
        case " ":
            hardDrop()
            break
        case "l":
            tryMove(-1, 0)
            break
        case "'":
            tryMove(1, 0)
            break
        case ";":
            tryMove(0, 1)
            break
        case "p":
            hardDrop()
            break
        case "s":
            tryRotate(true)
            break
        case "f":
            tryRotate(false)
            break
        default:
            break
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        // console.log("KeyUp: ", e)
    }

    type IUpdateBoardOptions = {
        cleanUp: boolean
        updateImmediately: boolean
    }

    const updateBoard = (incomingBoard: number[][], incomingShape: IShapePosition, opts: IUpdateBoardOptions) => {
        const { cleanUp, updateImmediately } = opts

        // making a full clone for safety, would need to evaluate if this is causing performance issues later
        const updatedBoard: number[][] = structuredClone(incomingBoard)
        const updatedShape: IShapePosition = structuredClone(incomingShape)

        const updatedShapeValues = updatedShape.shape.states[updatedShape.state as keyof IShapeState]

        updatedShapeValues.forEach((shapePos) => {
            updatedBoard[shapePos.y + updatedShape.position.y][shapePos.x + updatedShape.position.x] = (cleanUp) ? 0 : updatedShape.shape.value
        })

        if (updateImmediately) {
            setBoard(updatedBoard)
        }

        return updatedBoard
    }

    // main game loop
    useEffect(() => {
        let updatedBoard: number[][] = structuredClone(board)
        const updatedShape: IShapePosition = structuredClone(shape)

        // place shape flag is used to disable the erasure of the previous shape
        if (placeShapeFlag) {
            setPlaceShapeFlag(false)
        } else {
            if (oldShape) {
                updatedBoard = updateBoard(updatedBoard, oldShape, {cleanUp: true, updateImmediately: false})
            }
        }


        updateBoard(updatedBoard, updatedShape, {cleanUp: false, updateImmediately: true})
    }, [shape])

    // in game timer (piece gravity)
    const gravityLoop = useCallback(() => {
        // check if the shape can still move down
        if (tryMove(0, 1)) {
            console.log("move down")
        }
        else {
            setPlaceShapeFlag(true)
            getNewShape()
        }

    }, [tryMove, setPlaceShapeFlag, getNewShape])

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
    
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [onKeyDown, onKeyUp])

    useLoop(gravityLoop, 600)

    return [board] as const
}