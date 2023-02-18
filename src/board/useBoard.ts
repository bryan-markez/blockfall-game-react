import React, { useState, useEffect } from "react"
import { useShape } from "./shape/useShape"
import { IShapePosition, IShapeState } from "./shape/Shape.interfaces"
import { IPosition } from "./Board.interfaces"

export const ROW_COUNT = 20
export const COL_COUNT = 10

const createEmptyBoard = (x: number, y: number): number[][] => {
    return Array.from(Array(x), () => new Array(y).fill(0))
}

export const useBoard = () => {
    const [board, setBoard] = useState<number[][]>(createEmptyBoard(ROW_COUNT, COL_COUNT))
    const [placeShapeFlag, setPlaceShapeFlag] = useState<boolean>(false) // used to trigger the placement of a new shape
    const [shape, oldShape, moveShape, rotateShape, getNewShape] = useShape()

    const updateBoard = (newShape: IShapePosition) => {
        const updatedBoard: number[][] = structuredClone(board)

        // need the current shape in order to clean up the board
        if (!placeShapeFlag) {
            if (oldShape) {
                const currentShapeValues = oldShape.shape.states[oldShape.state as keyof IShapeState]

                currentShapeValues?.forEach((shapePos) => {
                    updatedBoard[shapePos.y + oldShape.position.y][shapePos.x + oldShape.position.x] = 0
                })
            }
        } else {
            setPlaceShapeFlag(false)
        }


        const newShapeValues = newShape.shape.states[newShape.state as keyof IShapeState]

        newShapeValues.forEach((shapePos) => {
            updatedBoard[shapePos.y + newShape.position.y][shapePos.x + newShape.position.x] = newShape.shape.value
        })

        setBoard(updatedBoard)
    }

    // validate the next move
    const validateMove = (pos: IPosition): boolean => {
        let validMoveFlag = true
        const updatedBoardPreview: number[][] = structuredClone(board)

        // need the current shape in order to clean up the board
        const currentShape: IShapePosition = structuredClone(shape)

        const currentShapeValues = currentShape.shape.states[currentShape.state as keyof IShapeState]

        currentShapeValues.forEach((shapePos) => {
            updatedBoardPreview[shapePos.y + currentShape.position.y][shapePos.x + currentShape.position.x] = 0
        })

        const newShapePosition = currentShape.position
        newShapePosition.x += pos.x
        newShapePosition.y += pos.y


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

    const tryMove = (x: number, y: number) => {
        let flag = false

        if (validateMove({x, y})) {
            moveShape(x, y)
            flag = true
        }

        return flag
    }

    const hardDrop = () => {
        console.log("hard drop")
    }

    const onKeyDown = (e: KeyboardEvent) => {
        console.log("KeyDown: ", e)
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
            rotateShape(true)
            break
        case "f":
            rotateShape(false)
            break
        default:
            break
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        console.log("KeyUp: ", e)
    }

    useEffect(() => {
        console.log(shape.position)
        updateBoard(shape)

        return () => {}
    }, [shape])

    useEffect(() => {
        const interval = setInterval(() => {
            // check if the shape can still move down
            console.log('hit')
            if (tryMove(0, 1)) {
                console.log("move down")
            }
            else {
                setPlaceShapeFlag(true)
                getNewShape()
            }
        }, 600)

        return () => {
            clearInterval(interval)
        }
    }, [board])

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
    
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [onKeyDown, onKeyUp])
    

    return [board]
}