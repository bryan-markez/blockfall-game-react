interface IPosition {
    x: number
    y: number
}

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
}

const O_SHAPE: IShape = {
    states: {
        1: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        2: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        3: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        4: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ]
    },
    currentState: 1,
    width: 4,
    height: 3
}

const I_SHAPE: IShape = {
    states: {
        1: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 }
        ],
        2: [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 }
        ],
        3: [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 2 }
        ],
        4: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 }
        ]
    },
    currentState: 1,
    width: 4,
    height: 4
}

const L_SHAPE: IShape = {
    states: {
        1: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        2: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        3: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 2 }
        ],
        4: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 0, y: 2 }
        ]
    },
    currentState: 1,
    width: 3,
    height: 3
}

const J_SHAPE: IShape = {
    states: {
        1: [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: 1 }
        ],
        2: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 2 }
        ],
        3: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 0, y: 2 }
        ],
        4: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ]
    },
    currentState: 1,
    width: 3,
    height: 3
}

const S_SHAPE: IShape = {
    states: {
        1: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
        ],
        2: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 2 }
        ],
        3: [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        4: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ]
    },
    currentState: 1,
    width: 3,
    height: 3
}

const Z_SHAPE: IShape = {
    states: {
        1: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
        ],
        2: [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ],
        3: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 2 }
        ],
        4: [
            { x: 0, y: 2},
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 0 }
        ]
    },
    currentState: 1,
    width: 3,
    height: 3
}

const T_SHAPE: IShape = {
    states: {
        1: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 0 }
        ],
        2: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 1 }
        ],
        3: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 2 }
        ],
        4: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 0, y: 1 }
        ]
    },
    currentState: 1,
    width: 3,
    height: 3
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