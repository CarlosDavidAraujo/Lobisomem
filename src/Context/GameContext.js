import { createContext, useState } from "react";
import Game from "../Classes/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
    const [screen, setScreen] = useState('definePlayers')
    const [game] = useState(new Game());


    return (
        <GameContext.Provider value={{ game, screen, setScreen }}>
            {children}
        </GameContext.Provider>
    )
}