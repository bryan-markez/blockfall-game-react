import { IShapePosition } from "./shape/Shape.interfaces"

interface IBoardGrid {
    rows: number
    cols: number
}

interface IRowProps {
    row: number[]
    rowIndex: number
}

interface IBlockProps {
    state: number
    ghostFlag?: boolean
}


// TODO we need to start figuring out how to separate graphics / game logic
interface IShapePieceProps {
    shape: IShapePosition
    ghost: boolean
}

export type {
    IBoardGrid,
    IRowProps,
    IBlockProps,
    IShapePieceProps
}