/* eslint-disable react/jsx-key */
import React, { memo, useCallback } from "react"
import { useBoard, ROW_COUNT, COL_COUNT } from "./useBoard"
import { Container, Graphics, Sprite, Text } from "@pixi/react"
import * as PIXI from "pixi.js"

import { IBoardGrid, IRowProps, IBlockProps, IShapePieceProps } from "./Board.interfaces"
import { IPosition } from "./General.interfaces"
import { IShapeState } from "./shape/Shape.interfaces"

const Board = (): JSX.Element => {
    const [board, shape, gameOverFlag, score, combo, backToBack, ghostShape] = useBoard(0)

    return (
        <Container position={[0, 0]}>
            <BoardGrid rows={ROW_COUNT} cols={COL_COUNT}/>
            {board.map((row, rowIdx) => {
                return (
                    <Row row={row} rowIndex={rowIdx}/>
                )
            })}
            <Shape shape={shape} ghost={false}/>

            <Text text={`Score: ${score}`} x={225} y={100}/>
            <Text text={`Combo: ${combo}`} x={225} y={150}/>
            {(backToBack > 0) && <Text text={`Back to Back ${backToBack}x`} x={225} y={200}/>}
            {(ghostShape) && <Shape shape={ghostShape} ghost={true}/>}
            {gameOverFlag && <Text text="Game Over" x={100} y={50}/>}
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
    const ghostPieceFlag = props.ghostFlag

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
    case -1:
        // grey
        color = 0x808080
        break
    }

    let alphaValue = props.state === 0 ? 0 : 0.8
    if (ghostPieceFlag) {
        alphaValue = 0.3 * alphaValue
    }

    return (
        <Sprite 
            texture={PIXI.Texture.WHITE} 
            width={20} 
            height={20} 
            tint={props.state === 0 ? 0xFFFFFF : color}
            alpha={alphaValue}
        />
    )
}

// todo refactor GhostShapeIndicator to use Shape
const Shape = ({shape, ghost}: IShapePieceProps): JSX.Element => {
    const position = shape.position as IPosition
    const blocks = shape.shape.states[shape.state as keyof IShapeState]

    return (
        <>
            {blocks.map((block, idx) => {
                return (
                    <Container position={[(position.x + block.x) * 20, (position.y + block.y) * 20]}>
                        <Block state={shape.shape.value} ghostFlag={ghost}/>
                    </Container>
                )
            })}
        </>
    )
}

export default Board