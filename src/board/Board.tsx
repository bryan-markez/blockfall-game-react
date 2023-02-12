/* eslint-disable react/jsx-key */
import React from "react"
import { useBoard } from "./BoardLogic"
import { Container, Sprite } from "@pixi/react"
import * as PIXI from "pixi.js"


interface BoardProps {
    random: boolean
}

interface RowProps {
    row: number[]
    rowIndex: number
}

interface BlockProps {
    state: number
}

const Board: React.FC<BoardProps> = () => {
    const [board] = useBoard()


    return (
        <Container position={[0, 0]}>
            {board.map((row, rowIdx) => {
                return (
                    <Row row={row} rowIndex={rowIdx}/>
                )
            })}
        </Container>
    )
}

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
            tint={props.state === 0 ? 0x000000 : 0xFFFFFF}
        />
    )
}

export default Board