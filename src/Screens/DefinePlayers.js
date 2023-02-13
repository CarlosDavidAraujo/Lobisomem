import { useContext, useState } from "react"
import styled from "styled-components";
import { GameContext } from "../Context/GameContext";

const Portrait = styled.div`
    background-color: gray;
    border-radius: 50%;
    width: 50px;
    aspect-ratio: 1/1;
`;

export default function DefinePlayers() {
    const {game, setScreen} = useContext(GameContext);
    const [players, setPlayers] = useState([
        'jogador 1',
        'jogador 2',
        'jogador 3',
        'jogador 4',
    ]);

    const handlePlayerChange = (e, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = e.target.value;
        setPlayers(updatedPlayers);
    }

    const handleAddPlayer = () => {
        setPlayers([...players, `jogador ${players.length + 1}`])
    }

    const handleRemovePlayer = (index) => {
        const updatedPlayers = [...players];
        setPlayers(updatedPlayers.filter((_, i) => i !== index))
    }
 
    function handleDefinePlayers() {
        game.setPlayers(players);
        setScreen('defineRoles');
    }

    return (
        <>
            {players.map((player, i) =>
                <div key={i}>
                    <Portrait />
                    <input
                        key={i}
                        value={player}
                        onChange={(e) => handlePlayerChange(e, i)}
                    />
                    <button onClick={() => handleRemovePlayer(i)}>x</button>
                </div>)}
            <button onClick={handleAddPlayer}>Adicionar jogador</button>
            <button onClick={() => handleDefinePlayers()}>Confirmar</button>
        </>
    )
}