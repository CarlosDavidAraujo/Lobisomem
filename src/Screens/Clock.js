import { useContext } from "react"
import { GameContext } from "../Context/GameContext"

export default function Clock () {
    const {setScreen} = useContext(GameContext);

    return (
        <>
            <h2>Tempo passando</h2>
            <button onClick={()=> setScreen('votes')}>Iniciar votacao</button>
        </>      
    )
}