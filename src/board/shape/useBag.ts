import React, { useEffect, useRef } from "react"
import { IShape } from "./Shape.interfaces"
import { getRandomBag } from "./Shape"

export const useBag = (initialShape: IShape) => {
    const savedBag = useRef<IShape[]>(getRandomBag(initialShape))

    useEffect(() => {
        if (savedBag.current.length === 0) {
            savedBag.current.push(...getRandomBag())
        }
        console.log("bag ", savedBag.current)
    }, [savedBag.current])

    return [savedBag] as const
}