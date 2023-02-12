interface IPosition {
    x: number
    y: number
}

interface IShape {
    shape: Array<IPosition>
    width: number
    height: number
}

const O_SHAPE: IShape = {
    shape: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ],
    width: 2,
    height: 2
}

const I_SHAPE: IShape = {
    shape: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 }
    ],
    width: 4,
    height: 1
}

const L_SHAPE: IShape = {
    shape: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
    ],
    width: 3,
    height: 2
}

const J_SHAPE: IShape = {
    shape: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
    ],
    width: 3,
    height: 2
}

const S_SHAPE: IShape = {
    shape: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ],
    width: 3,
    height: 2
}

const Z_SHAPE: IShape = {
    shape: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
    ],
    width: 3,
    height: 2
}

const T_SHAPE: IShape = {
    shape: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
    ],
    width: 3,
    height: 2
}

const randomShape = (): IShape => {
    const shapes = [
        O_SHAPE,
        I_SHAPE,
        L_SHAPE,
        J_SHAPE,
        S_SHAPE,
        Z_SHAPE,
        T_SHAPE
    ]

    return shapes[Math.floor(Math.random() * shapes.length)]
}

export {
    O_SHAPE,
    I_SHAPE,
    L_SHAPE,
    J_SHAPE,
    S_SHAPE,
    Z_SHAPE,
    T_SHAPE,
    randomShape
}