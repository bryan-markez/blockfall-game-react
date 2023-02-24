import { useEffect, useRef } from "react"

export const useKey = (callback: () => void, key: string) => {
    const savedCallback = useRef<() => void>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function keyFunc(e: KeyboardEvent) {
            if (savedCallback.current) {
                if (e.key === key) {
                    console.log("hit key: ", e)
                    savedCallback.current()
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