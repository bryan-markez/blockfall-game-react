import { useState } from "react"

export const useScoreSystem = () => {
    const [score, setScore] = useState<number>(0)
    const [backToBack, setBackToBack] = useState<number>(0)
    const [combo, setCombo] = useState<number>(0)

    const updateScoreByLineClear = (lines: number, spin = false) => {
        let newScore = 0
        const updatedB2B = backToBack

        switch (lines) {
        case 1:
            newScore = (spin) ? 800 : 100
            break
        case 2:
            newScore = (spin) ? 1200 : 300
            break
        case 3:
            newScore = (spin) ? 1600: 500
            break
        case 4:
            newScore = 800
            break
        default:
            break
        }

        // Adjust score for B2B
        if (updatedB2B > 0) {
            newScore = newScore * 1.5
        }

        // Adjust B2B
        if (spin || lines === 4) {
            setBackToBack(backToBack + 1)
        } else if (lines > 0) {
            setBackToBack(0)
        }

        // Adjust score for combo
        if (lines > 0) {
            newScore = newScore + (50 * combo)
            setCombo(combo + 1)
        } else {
            resetCombo()
        }

        setScore(score + newScore)
    }

    const resetCombo = () => {
        setCombo(0)
    }

    const resetScore = () => {
        setScore(0)
        setBackToBack(0)
        setCombo(0)
    }

    return [score, backToBack, combo, updateScoreByLineClear, resetScore] as const
}