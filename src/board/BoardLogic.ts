import { useEffect, useState } from "react"
import { randomShape } from "./shape/Shape"
import { useShape } from "./shape/useShape"

import { IShape, IShapeState } from "./shape/Shape.interfaces"
import { IPosition } from "./Board.interfaces"

export const ROW_COUNT = 20
export const COL_COUNT = 10

type Board = [number[][]]

// Scene manipulation
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


const updateBoardByShape = (scene: number[][], shape: IShape, position: IPosition): number[][] => {
    let updatedScene = scene.slice()

    const currentShape = shape.states[shape.currentState as keyof IShapeState]

    currentShape.forEach((shapePos) => {
        updatedScene = updateBoard(
            updatedScene,
            { x: shapePos.x + position.x, y: shapePos.y + position.y },
            shape.value
        )
    })

    return updatedScene
}

export const useBoardLogic = (): Board => {
    const [scene, setScene] = useState<number[][]>(createEmptyScene())
    const [shape, moveShape, rotateShape, resetShape] = useShape()
    const [board, setBoard] = useState<number[][]>(updateBoardByShape(scene, shape, position))

    // Piece movement and manipulations
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
    
    const hardDrop = () => {
        // move shape down until it collides
        let updatedPosition = position
        let hitBottom = false
        while (!hitBottom) {
            const newUpdatedPosition: IPosition = {
                x: updatedPosition.x,
                y: updatedPosition.y + 1
            }

            if (!validateMove(newUpdatedPosition)) {
                hitBottom = true
            } else {
                updatedPosition = newUpdatedPosition
            }
        }

        placeShape(updatedPosition)
    }

    const rotateShape = (cw: boolean) => {
        let newShapeState = shape.currentState

        if (cw) {
            newShapeState = newShapeState === 4 ? 1 : newShapeState + 1
        } else {
            newShapeState = newShapeState === 1 ? 4 : newShapeState - 1
        }

        if (validateMove(position, newShapeState)) {
            setShape({ ...shape, currentState: newShapeState })
        }
    }

    const validateMove = (newPosition: IPosition, newShapeState = 0): boolean => {
        const targetShapeState = newShapeState === 0 ? shape.currentState : newShapeState
        const currentShape = shape.states[targetShapeState as keyof IShapeState]

        // get absolute position of each block
        const absoluteShape = currentShape.map((pos) => {        
            return { x: pos.x + newPosition.x, y: pos.y + newPosition.y }
        })

        // check if any block is out of bounds
        const outOfBounds = absoluteShape.some((pos) => {
            return pos.x < 0 || pos.x >= COL_COUNT || pos.y < 0 || pos.y >= ROW_COUNT
        })

        if (outOfBounds) {
            console.log("outOfBounds ", outOfBounds)
            return false
        }

        // check if any block is colliding with another block
        const colliding = absoluteShape.some((pos) => {
            return scene[pos.y][pos.x] > 0
        })

        if (colliding) {
            return false
        }

        return true
    }

    // Additional board manipulation
    const lineClear = () => {
        const updatedScene = scene.map((row) => { return row.slice() })
        let didUpdate = false
        // iterate through each row
        for (let i = 0; i < scene.length; i++) {
            const fullRow = scene[i].every((block) => { return block > 0 })

            if (fullRow) {
                // remove row
                updatedScene.splice(i, 1)
                // add empty row to top
                updatedScene.unshift(new Array(COL_COUNT).fill(0))

                didUpdate = true
            }
        }

        if (didUpdate) {
            setScene(updatedScene)
        }
    }

    const updateBoardState = () => {
        const updatedBoard = updateBoardByShape(scene, shape, position)
        setBoard(updatedBoard)
    }

    const placeShape = (newPosition: IPosition | undefined = undefined) => {
        const positionToUse = newPosition || position

        setScene(updateBoardByShape(scene, shape, positionToUse))
        setShape(randomShape())
        setPosition({ x: 0, y: 0 })
    }

    // TODO left, right, down, hardrop, spin, spin ccw, Other file set keybindings, do some more abstraction
    // Keyboard Inputs
    const onKeyDown = (e: KeyboardEvent) => {
        console.log("KeyDown: ", e)
        switch (e.key) {
        case "ArrowLeft":
            moveShape(-1, 0)
            break
        case "ArrowRight":
            moveShape(1, 0)
            break
        case "ArrowDown":
            moveShape(0, 1)
            break
        case "ArrowUp":
        case " ":
            hardDrop()
            break
        case "l":
            moveShape(-1, 0)
            break
        case "'":
            moveShape(1, 0)
            break
        case ";":
            moveShape(0, 1)
            break
        case "p":
            hardDrop()
            break
        case "s":
            rotateShape(false)
            break
        case "f":
            rotateShape(true)
            break
        default:
            break
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        console.log("KeyUp: ", e)
    }

    useEffect(updateBoardState, [scene, shape, position])
    useEffect(lineClear, [scene])
    useEffect(() => {
        const interval = setInterval(() => {
            if (moveShape(0, 1)) {
                // console.log("move down")
            } else {
                // console.log("cannot move down")
                placeShape()
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
            console.log("unmounting")
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [onKeyDown, onKeyUp])

    return [board]
}