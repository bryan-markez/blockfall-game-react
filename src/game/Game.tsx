import React from "react"
import Board from "../board/Board"
import { GameContainer } from "./Game.styles"
import { Stage } from "@pixi/react"


interface GameProps {
    random: boolean
}

const Game: React.FC<GameProps> = () => {
    return (
        <>
            <div>
                <h1>Game</h1>
            </div>
            <GameContainer>
                <Stage width={300} height={400} options={{backgroundColor: "#FFFFFF"}}>
                    <Board random={false}/>
                </Stage>
            </GameContainer>
        </>
    )
}

export default Game