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

interface IGhostPieceProps {
    shape: IShapePosition
}

export type {
    IBoardGrid,
    IRowProps,
    IBlockProps,
    IGhostPieceProps
}