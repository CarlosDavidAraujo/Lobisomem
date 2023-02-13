import { useContext } from "react"
import { GameContext } from "../Context/GameContext"

export default function Day() {
    const { game, setScreen } = useContext(GameContext);
    const winner = game.getWinnerTeam();

    return (
        <>
            {winner? <div> Os {winner} venceram!</div>
                :
                <div>
                    <button onClick={() => setScreen('clock')}>Reunir a vila</button>

                    {game.getNews().map((message, i) =>
                        <h3>{message}</h3>
                    )}
                </div>
            }
        </>
    )
}