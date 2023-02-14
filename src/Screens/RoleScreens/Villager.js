import { useState } from "react"

export default function Villager({ currentGame, playerList, currentPlayer }) {
    const [message, setMessage] = useState();
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [playersToChoose, setPlayersToChoose] = useState(null);
    const [playerWasChoosed, setPlayerWasChoosed] = useState(false);

    function handleBisbilhotar() {
        const villager = currentPlayer.getRole();
        setMessage(villager.bisbilhotar(playerList, currentGame));
        setSkillWasUsed(true);
    }

    function handleOrar() {
        setPlayersToChoose(playerList);
        setSkillWasUsed(true);
    }

    function handleChoosePlayer(otherPlayer) {
        setMessage(currentPlayer.getRole().orar(otherPlayer));
        setPlayerWasChoosed(true);
    }

    return (
        <div>
            {!skillWasUsed &&
                <>
                    <button onClick={() => handleBisbilhotar()}>Bisbilhotar</button>
                    <button onClick={() => handleOrar()}>Orar</button>
                </>
            }
            {playersToChoose &&
                playersToChoose.map((player, i) =>
                    player.getName() !== currentPlayer.getName() && !playerWasChoosed &&
                    < button
                        key={i}
                        onClick={() => handleChoosePlayer(player)}
                    >{player.getName()}
                    </button>
                )
            }
            {message}
        </div >
    )
}