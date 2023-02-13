import { useContext, useState } from "react"
import { GameContext } from "../Context/GameContext"


export default function PassToPlayer() {
    const { game, setScreen } = useContext(GameContext);
    const [ready, setReady] = useState(false);

    return (
        <>
            {ready ?
                <>
                    <h2>{game.getCurrentPlayer().getName()}</h2>
                    <button onClick={() => setScreen('playerAction')}>Mostrar função</button>
                </>
                :
                <>
                    <h2>Passe para {game.getCurrentPlayer().getName()}</h2>
                    <button onClick={() => setReady(true)}>Clique quando estiver pronto</button>
                </>
            }

        </>
    )
}