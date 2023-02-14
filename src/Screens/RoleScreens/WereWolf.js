import { useState } from "react"

export default function WereWolf({ currentGame, playerList, currentPlayer }) {
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [skillWasChosen, setSkillWasChosen] = useState(false);
    const [targetPlayer, setTargetPlayer] = useState();
    

    function handleDevorar() {
        const werewolf = currentPlayer.getRole();
        werewolf.devorar(targetPlayer, currentGame);
        setSkillWasUsed(true);
    }

    function isCurrentPlayer(player) {
        return player.getName() === currentPlayer.getName();
    }

    function isWerewolf(player) {
        return player.getRole().getName() === "Lobisomem";
    }

    return (
        <div>
            {!skillWasUsed &&
                <div>
                    Clique em devorar para escolher o jogador que você quer eliminar esta noite, depois clique em confirmar e termine a vez.
                    <button onClick={() => setSkillWasChosen(true)}>Devorar</button>
                    {
                        playerList.map((player, i) => (
                            !isCurrentPlayer(player) &&
                            <button
                                key={i}
                                onClick={() => setTargetPlayer(player)}
                                disabled={isCurrentPlayer(player) || isWerewolf(player) || !skillWasChosen}
                                style={targetPlayer === player ? { backgroundColor: 'yellow' } : {}}
                            >
                                {player.getName()}
                                {isWerewolf(player) && <span>(Lobisomem)</span>}
                            </button>
                        ))
                    }
                    <button onClick={() => handleDevorar()}>Confirmar</button>
                </div>
            }
        </div>
    )
}
