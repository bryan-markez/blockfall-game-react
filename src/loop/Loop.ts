import React, {useEffect, useRef} from "react"

// TODO refactor to make typescript happy :)

export const useInterval = (callback: () => void, delay: number) => {
    const callbackRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const interval = setInterval(() => {
            callbackRef.current()
        }, delay)

        return () => clearInterval(interval)
    }, [delay])
}