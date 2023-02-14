import { createContext, useState } from "react";
import Game from "../Classes/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("gameMenu");
  const [previousScreen, setPreviousScreen] = useState("gameMenu");
  const [currentGame, setCurrentGame] = useState(new Game());

  return (
    <GameContext.Provider
      value={{
        currentGame,
        setCurrentGame,
        screen,
        setScreen,
        previousScreen,
        setPreviousScreen,
        playerList: currentGame.getPlayers(),
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
