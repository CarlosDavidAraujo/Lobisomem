import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import Clock from "./Clock";
import Day from "./Day";
import DefinePlayers from "./DefinePlayers";
import DefineRoles from "./DefineRoles"
import PassToPlayer from "./PassToPlayer";
import PlayerAction from "./PlayerAction";
import Votes from "./Votes";

const screens = {
    definePlayers: <DefinePlayers/>,
    defineRoles: <DefineRoles/>,
    passToPlayer: <PassToPlayer/>,
    playerAction: <PlayerAction/>,
    clock: <Clock/>,
    votes: <Votes/>,
    day: <Day/>
}

export default function Home() {
    const {screen} = useContext(GameContext);

    return (
        <>
            {screens[screen]}
        </>
    )
}