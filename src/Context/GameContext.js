import { createContext, useState } from "react";
import Game from "../Classes/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
    const [screen, setScreen] = useState('gameMenu');
    const [lastScreen, setLastScreen] = useState('gameMenu');
    const [game, setGame] = useState(new Game());

    return (
        <GameContext.Provider value={{ game, setGame, screen, setScreen, lastScreen, setLastScreen }}>
            {children}
        </GameContext.Provider>
    )
}