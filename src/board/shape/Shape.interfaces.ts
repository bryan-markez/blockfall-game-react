import { IPosition } from "../Board.interfaces"

interface IShapeState {
    1: IPosition[]
    2: IPosition[]
    3: IPosition[]
    4: IPosition[]

}

interface IShape {
    states: IShapeState
    currentState: number
    width: number
    height: number
    value: number
}

export type {
    IShape,
    IShapeState
}