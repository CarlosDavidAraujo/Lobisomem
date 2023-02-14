import { useState } from "react"

export default function Hunter({ game, playerList, currentPlayer }) {
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [skillWasChosen, setSkillWasChosen] = useState(false);
    const [targetPlayer, setTargetPlayer] = useState();

    function handleAtirar() {
        currentPlayer.getRole().atirar(targetPlayer, game);
        setSkillWasUsed(true);
    }

    function isCurrentPlayer(player) {
        return player.getName() === currentPlayer.getName();
    }

    return (
        <div>
            {!skillWasUsed &&
                <div>
                    Clique em atirar, em seguida escolha o jogador que deseja eliminar, mas cuidado para não escolher um incocente.
                    <button onClick={() => setSkillWasChosen(true)}>Atirar</button>
                    {
                        playerList.map((player, i) => (
                            !isCurrentPlayer(player) &&
                            <button
                                key={i}
                                onClick={() => setTargetPlayer(player)}
                                disabled={isCurrentPlayer(player) || !skillWasChosen}
                                style={targetPlayer === player ? { backgroundColor: 'yellow' } : {}}
                            >
                                {player.getName()}
                            </button>
                        ))
                    }
                    <button onClick={() => handleAtirar()}>Confirmar</button>
                </div>
            }
        </div>
    )
}