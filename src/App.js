import {GameProvider} from "./Context/GameContext";
import ScreenManager from "./Screens/ScreenManager";


function App() {
  return (
    <GameProvider>
      <ScreenManager/>
    </GameProvider>
  );
}

export default App;
