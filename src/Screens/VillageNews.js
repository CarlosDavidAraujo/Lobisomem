import { useContext } from "react"
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext"

export default function VillageNews() {
    const { game, setGame, setScreen, lastScreen } = useContext(GameContext);
    const winner = game.getWinnerTeam();

    function handleEndGame() {
        setGame(new Game());
        setScreen('gameMenu');
    }

    function handleScreenChange() {
        game.clearTurnNews();
        setScreen(lastScreen === 'votes' ? 'playerAction' : 'clock');
    }



    return (
        <>
            {winner ? (
                <button onClick={() => handleEndGame()}>Novo jogo</button>
            ) : lastScreen === "playerAction" ? (
                <button onClick={() => handleScreenChange()}>Reunir a vila</button>
            ) : lastScreen === "votes" ? (
                <button onClick={() => handleScreenChange()}>Adormecer</button>
            ) : null}



            <div>
                {game.getNews().map((message, i) =>
                    <h3>{message}</h3>
                )}
            </div>
        </>
    )
}