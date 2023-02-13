import { useContext, useState } from "react"
import { GameContext } from "../Context/GameContext"

export default function Votes() {
    const { game, setScreen } = useContext(GameContext);
    const [currentPlayer, setCurrentPlayer] = useState(game.getCurrentPlayer());
    const [votingClosed, setVotingClosed] = useState(false);
    const [mostVotedPlayer, setMostVotedPlayer] = useState();

    function handleVotes(player) {
        player.setVotesCount();
        game.passToNextPlayer();
        setCurrentPlayer(game.getCurrentPlayer());

        if (game.noNextPlayer()) {
            setMostVotedPlayer(game.getMostVotedPlayer().getName());
            game.removePlayers();

            const winner = game.getWinnerTeam();
            if (winner) {
                setScreen('day');
            }
            else {
                setVotingClosed(true);
            }
        }
    }

    function handleNextTurn() {
        game.resetNews(); // reseta as noticias
        //reseta estados de protecao
        setScreen('passToPlayer');
    }

    return (
        <>
            {!votingClosed &&
                <div>
                    <h1>{currentPlayer.getName()} escolha seu voto</h1>
                    {game.getPlayers().map((player, i) =>
                        <>
                            <button onClick={() => handleVotes(player)}>{player.getName()}</button>
                        </>
                    )}
                </div>
            }

            {votingClosed &&
                <div>
                    <div>A aldeia matou {mostVotedPlayer}</div>
                    <button onClick={() => handleNextTurn()}>Próxima rodada</button>
                </div>
            }

        </>
    )
}