import { useContext } from "react"
import { GameContext } from "../Context/GameContext"

export default function GameMenu() {
    const {setScreen} = useContext(GameContext);

    return (
        <button onClick={() => setScreen('definePlayers')}>Iniciar</button>
    )
}