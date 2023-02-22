import { IPosition } from "../General.interfaces"

interface IShapeState {
    1: IPosition[]
    2: IPosition[]
    3: IPosition[]
    4: IPosition[]
}

interface IShape {
    states: IShapeState
    width: number
    height: number
    value: number
}

interface IShapePosition {
    shape: IShape
    state: number
    position: IPosition
}

export type {
    IShape,
    IShapeState,
    IShapePosition
}