import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import Clock from "./Clock";
import VillageNews from "./VillageNews";
import DefinePlayers from "./DefinePlayers";
import DefineRoles from "./DefineRoles"
import GameMenu from "./GameMenu";
import PassToPlayer from "./PassToPlayer";
import PlayerAction from "./PlayerAction";
import Votes from "./Votes";

const screens = {
    gameMenu: <GameMenu/>,
    definePlayers: <DefinePlayers/>,
    defineRoles: <DefineRoles/>,
    passToPlayer: <PassToPlayer/>,
    playerAction: <PlayerAction/>,
    clock: <Clock/>,
    votes: <Votes/>,
    villageNews: <VillageNews/>
}

export default function Home() {
    const {screen} = useContext(GameContext);

    return (
        <>
            {screens[screen]}
        </>
    )
}