import React, { useEffect, useRef } from "react"


export const useLoop2 = (callback: () => void, fps: number) => {
    const requestRef = useRef<number>()
    const previousTimeRef = useRef<number>()

    const animate = (time: number) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current
            if (deltaTime > 1000 / fps) {
                callback()
                previousTimeRef.current = time
            }
        } else {
            previousTimeRef.current = time
        }
        requestRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current!)
    }, []) // Make sure the effect runs only once
}

export const useLoop = (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current()
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => {
                console.log("clearing interval")
                clearInterval(id)
            }
        }
    }, [delay])
}