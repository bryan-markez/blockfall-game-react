/* eslint-disable react/jsx-key */
import React, { memo, useCallback, useEffect } from "react"
// import { useBoardLogic, ROW_COUNT, COL_COUNT } from "./BoardLogic"
import { useBoard, ROW_COUNT, COL_COUNT } from "./useBoard"
import { Container, Graphics, Sprite, Text } from "@pixi/react"
import * as PIXI from "pixi.js"

import { IBoardGrid, IRowProps, IBlockProps } from "./Board.interfaces"

const Board = (): JSX.Element => {
    const [board, gameOverFlag] = useBoard(0)

    return (
        <Container position={[0, 0]}>
            <BoardGrid rows={ROW_COUNT} cols={COL_COUNT}/>
            {board.map((row, rowIdx) => {
                return (
                    <Row row={row} rowIndex={rowIdx}/>
                )
            })}
            {gameOverFlag && <Text text="Game Over" x={100} y={50} style={{fill: 0x000000}}/>}
        </Container>
    )
}

const BoardGrid: React.FC<IBoardGrid> = memo(({...props}: IBoardGrid) => {
    const drawGrid = useCallback((g: PIXI.Graphics) => {
        g.clear()
        for (let y = 0; y < props.rows; y++) {
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

const Row: React.FC<IRowProps> = ({...props}) => {
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

const Block: React.FC<IBlockProps> = ({...props}) => {
    const pieceState = props.state
    let color = 0xFFFFFF
    switch (pieceState) {
    case 1:
        // yellow
        color = 0xFFFF00
        break
    case 2:
        // cyan
        color = 0x00FFFF
        break
    case 3:
        // blue
        color = 0x0000FF
        break
    case 4:
        // orange
        color = 0xFFA500
        break
    case 5:
        // green
        color = 0x00FF00
        break
    case 6:
        // red
        color = 0xFF0000
        break
    case 7:
        // purple
        color = 0x800080
        break
    default:
        break
    }


    return (
        <Sprite 
            texture={PIXI.Texture.WHITE} 
            width={20} 
            height={20} 
            tint={props.state === 0 ? 0xFFFFFF : color}
            alpha={props.state === 0 ? 0 : 0.8}
        />
    )
}

export default Board