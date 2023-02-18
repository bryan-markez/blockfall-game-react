import React from "react"
import Board from "../board/Board"
import { GameContainer } from "./Game.styles"
import { Stage } from "@pixi/react"


const Game = (): JSX.Element => {
    /*
        Maybe in here we can set up the main menu, and then have a button to start the game?
    */

    return (
        <>
            <div>
                <h1>Game</h1>
            </div>
            <GameContainer>
                <Stage width={800} height={600} options={{backgroundColor: "#ffffff"}}>
                    <Board />
                </Stage>
            </GameContainer>
        </>
    )
}

export default Game