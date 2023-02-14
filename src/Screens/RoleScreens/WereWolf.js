import { useState } from "react"

export default function WereWolf({ game, playerList, currentPlayer }) {
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [targetPlayer, setTargetPlayer] = useState();

    function handleDevorar() {
        currentPlayer.getRole().devorar(targetPlayer, game);
    }

    function isCurrentPlayer(player) {
        return player.getName() === currentPlayer.getName();
    }

    function isWerewolf(player) {
        return player.getRole().getName() === "Lobisomem";
    }

    function handleUseSkill() {
        setSkillWasUsed(true);
    }

    return (
        <div>
            Clique em devorar para escolher o jogador que você quer eliminar esta noite, depois clique em confirmar e termine a vez.
            <button onClick={() => handleUseSkill()}>Devorar</button>
            {
                playerList.map((player, i) => (
                    !isCurrentPlayer(player) &&
                    <button
                        key={i}
                        onClick={() => setTargetPlayer(player)}
                        disabled={isCurrentPlayer(player) || isWerewolf(player) || !skillWasUsed}
                        style={targetPlayer === player ? { backgroundColor: 'yellow' } : {} }
                    >
                        {player.getName()}
                        {isWerewolf(player) && <span>(Lobisomem)</span>}
                    </button>
                ))
            }
            <button onClick={() => handleDevorar()}>Confirmar</button>
        </div>
    )
}
