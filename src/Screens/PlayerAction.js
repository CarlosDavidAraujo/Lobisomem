import { useContext, useState } from "react"
import { GameContext } from "../Context/GameContext"
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import WereWolf from "./RoleScreens/WereWolf";


export default function PlayerAction() {
    const { game, setScreen } = useContext(GameContext);
    const [currentPlayer] = useState(game.getCurrentPlayer());

    const roleScreens = {
        Aldeão: <Villager currentPlayer={currentPlayer} playerList={game.getPlayers()} game={game}/>,
        Vidente: <Seer currentPlayer={currentPlayer} playerList={game.getPlayers()}/>,
        Lobisomem: <WereWolf currentPlayer={currentPlayer} playerList={game.getPlayers()} game={game}/>,
        Caçador: <Hunter currentPlayer={currentPlayer} playerList={game.getPlayers()} game={game}/>
    }
    
    function handlePassTurn() {
        game.passToNextPlayer();

        if (game.noNextPlayer()) {
            game.removePlayers();
            setScreen('day');
        } else {
            setScreen('passToPlayer');
        }
    }

    return (
        <>
            <h1>{currentPlayer.getRoleName()}</h1>
            <h2>Escolha uma habilidade</h2>
            {roleScreens[currentPlayer.getRoleName()]}
            <button onClick={()=> handlePassTurn()}>Terminar a vez</button>
        </>
    )
}