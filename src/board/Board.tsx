/* eslint-disable react/jsx-key */
import React, { memo, useCallback, useEffect } from "react"
import { useBoard, ROW_COUNT, COL_COUNT } from "./BoardLogic"
import { Container, Graphics, Sprite } from "@pixi/react"
import * as PIXI from "pixi.js"


interface BoardProps {
    random: boolean
}

interface IBoardGrid {
    rows: number
    cols: number
}

interface RowProps {
    row: number[]
    rowIndex: number
}

interface BlockProps {
    state: number
}

const Board: React.FC<BoardProps> = () => {
    const [board, onKeyDown, onKeyUp] = useBoard()

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
    
        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [onKeyDown, onKeyUp])
    


    return (
        <Container position={[0, 0]}>
            <BoardGrid rows={ROW_COUNT} cols={COL_COUNT}/>
            {board.map((row, rowIdx) => {
                return (
                    <Row row={row} rowIndex={rowIdx}/>
                )
            })}
        </Container>
    )
}

const BoardGrid: React.FC<IBoardGrid> = memo(({...props}) => {
    const drawGrid = useCallback((g: PIXI.Graphics) => {
        g.clear()
        // TODO figure out what actually is react/prop-types
        // eslint-disable-next-line react/prop-types
        for (let y = 0; y < props.rows; y++) {
            // eslint-disable-next-line react/prop-types
            for (let x = 0; x < props.cols; x++) {
                g.lineStyle(1, 0x000000, 1)
                g.drawRect(x * 20, y * 20, 20, 20)
            }
        }
    }, [])

    return (
        <Graphics draw={drawGrid}/>
    )
})
BoardGrid.displayName = "BoardGrid"

const Row: React.FC<RowProps> = ({...props}) => {
    return (
        <>
            {props.row.map((state, col) => {
                return (
                    <Container position={[col * 20, props.rowIndex * 20]}>
                        <Block state={state}/>
                    </Container>
                )
            })}
        </>
    )
}

const Block: React.FC<BlockProps> = ({...props}) => {

    return (
        <Sprite 
            texture={PIXI.Texture.WHITE} 
            width={20} 
            height={20} 
            tint={props.state === 0 ? 0xFFFFFF : 0xFFFF00}
            alpha={props.state === 0 ? 0 : 0.8}
        />
    )
}

export default Board