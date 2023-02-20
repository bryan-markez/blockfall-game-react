interface IPosition {
    x: number
    y: number
}

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
}

export type {
    IPosition,
    IBoardGrid,
    IRowProps,
    IBlockProps
}