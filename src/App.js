import {GameProvider} from "./Context/GameContext";
import Home from "./Screens/Home";


function App() {
  return (
    <GameProvider>
      <Home/>
    </GameProvider>
  );
}

export default App;
