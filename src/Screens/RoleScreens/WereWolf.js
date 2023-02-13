import { useState, useEffect } from "react"

export default function WereWolf({ game, playerList, currentPlayer }) {
    const [message, setMessage] = useState();
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [playersToChoose, setPlayersToChoose] = useState(null);
    const [playerWasChoosen, setPlayerWasChoosen] = useState(false);

    useEffect(() => {
        if (message) {
            game.addNews(message);
        }
    }, [message]);

    function handleDevorar() {
        setPlayersToChoose(playerList);
        setSkillWasUsed(true);
    }

    function handleChoosePlayer(otherPlayer) {
        setMessage(currentPlayer.getRole().devorar(otherPlayer, game));
        setPlayerWasChoosen(true);
    }

    function isNotCurrentPlayer(player) {
        return player.getName() !== currentPlayer.getName()
    }

    return (
        <div>
            {!skillWasUsed &&
                <>
                    <button onClick={() => handleDevorar()}>Fome Eterna</button>
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
        </div >
    )
}