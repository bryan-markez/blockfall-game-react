import React, { useEffect, useRef } from "react"

export const useKeyboard = () => {
    const savedCallback = useRef()
}

// TODO need to make the callback type safer. Might need to rewrite some of the code so that the only functions we are passing in are () => {}
export const useKey = (callback: Function, key: string, args?: Array<any>) => {
    const savedCallback = useRef<Function>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function keyFunc(e: KeyboardEvent) {
            if (savedCallback.current) {
                if (e.key === key) {
                    console.log("hit key: ", e)
                    if (args) {
                        savedCallback.current(...args)
                    } else {
                        savedCallback.current()
                    }

                }
            }
        }

        if (key !== null) {
            window.addEventListener("keydown", keyFunc)
            return () => {
                window.removeEventListener("keydown", keyFunc)
            }
        }
    }, [key])
}