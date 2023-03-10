import { IShape } from "./Shape.interfaces"

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
    width: 4,
    height: 3,
    value: 1
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
    width: 4,
    height: 4,
    value: 2
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
    width: 3,
    height: 3,
    value: 3
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
    width: 3,
    height: 3,
    value: 4
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
    width: 3,
    height: 3,
    value: 5
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
    width: 3,
    height: 3,
    value: 6
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
    width: 3,
    height: 3,
    value: 7
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

const getRandomBag = (initialShape: IShape|null = null): IShape[] => {
    const bag = [
        O_SHAPE,
        I_SHAPE,
        L_SHAPE,
        J_SHAPE,
        S_SHAPE,
        Z_SHAPE,
        T_SHAPE
    ]

    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]]
    }

    if (initialShape) {
        for (let i = 0; i < bag.length; i++) {
            const currentShape = bag[i]
            if (currentShape.value === initialShape.value) {
                bag.splice(i, 1)
                break
            }
        }
    }

    return bag
}

export {
    O_SHAPE,
    I_SHAPE,
    L_SHAPE,
    J_SHAPE,
    S_SHAPE,
    Z_SHAPE,
    T_SHAPE,
    randomShape,
    getRandomBag
}