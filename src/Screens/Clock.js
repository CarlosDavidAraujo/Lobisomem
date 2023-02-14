import { useContext, useState, useEffect } from "react"
import { GameContext } from "../Context/GameContext"

export default function Clock() {
    const { setScreen } = useContext(GameContext);
    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
        let interval = null;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else {
            setScreen('votes');
        }
        return () => clearInterval(interval);
    }, [seconds, setScreen]);

    return (
        <>
            <h2>Tempo para discussão: {seconds} segundos</h2>
            <button onClick={() => setScreen('votes')}>Iniciar votação</button>
        </>
    )
}




