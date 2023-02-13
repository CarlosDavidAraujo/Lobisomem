import { useState } from "react"

export default function Seer({ playerList, currentPlayer }) {
    const [message, setMessage] = useState();
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [playersToChoose, setPlayersToChoose] = useState(null);
    const [playerWasChoosen, setPlayerWasChoosen] = useState(false);

    function handleRevelar() {
        setPlayersToChoose(playerList);
        setSkillWasUsed(true);
    }

    function handleChoosePlayer(otherPlayer) {
        setMessage(currentPlayer.getRole().revelar(otherPlayer));
        setPlayerWasChoosen(true);
    }

    function isNotCurrentPlayer(player) {
        return player.getName() !== currentPlayer.getName()
    } 

    return (
        <div>
            {!skillWasUsed &&
                <>
                    <button onClick={() => handleRevelar()}>Revelação</button>
                </>
            }
            {playersToChoose &&
                playersToChoose.map((player, i) =>
                    isNotCurrentPlayer(player) && !playerWasChoosen &&
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