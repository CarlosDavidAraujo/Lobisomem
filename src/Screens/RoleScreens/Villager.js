import { useState } from "react";
import styled from "styled-components";
import villagerImg from '../../Images/villager.png';
import prayIcon from '../../Images/pray.png';
import keyHole from '../../Images/keyhole.png';
import { SkillButton } from "../../Components/Button";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: justify;

    & .role-portrait {
        width: 250px;
    }

    & h2 {
        margin-right: auto;
    }
`;

const SkillsOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SkillContainer = styled.div`
    display: flex;
    gap: 20px;
`;



export default function Villager({ currentGame, playerList, currentPlayer }) {
    const [message, setMessage] = useState();
    const [skillWasUsed, setSkillWasUsed] = useState(false);
    const [playersToChoose, setPlayersToChoose] = useState(null);
    const [playerWasChoosed, setPlayerWasChoosed] = useState(false);

    function handleBisbilhotar() {
        const villager = currentPlayer.getRole();
        setMessage(villager.bisbilhotar(playerList, currentGame));
        setSkillWasUsed(true);
    }

    function handleOrar() {
        setPlayersToChoose(playerList);
        setSkillWasUsed(true);
    }

    function handleChoosePlayer(otherPlayer) {
        setMessage(currentPlayer.getRole().orar(otherPlayer));
        setPlayerWasChoosed(true);
    }

    return (
        <MainContainer>
            <h1>{currentPlayer.getRoleName()}</h1>
            <img className="role-portrait" src={villagerImg} />
            <h2>Escolha uma habilidade</h2>
            {!skillWasUsed &&
                <SkillsOptions>
                    <SkillContainer>
                        <SkillButton
                            label='Espiar'
                            onClick={() => handleBisbilhotar()}
                            icon={keyHole}
                        />
                        Há uma pequena chance de você descobrir um lobisomem, mas uma pequena chance de você morrer.
                    </SkillContainer>
                    <SkillContainer>
                        <SkillButton 
                        label="Rezar"
                        icon={prayIcon}
                        onClick={() => handleOrar()}
                        />
                        Escolha outro jogador. Há uma pequena chance dele ser protegido esta noite.
                    </SkillContainer>
                </SkillsOptions>
            }
            {playersToChoose &&
                playersToChoose.map((player, i) =>
                    player.getName() !== currentPlayer.getName() && !playerWasChoosed &&
                    < button
                        key={i}
                        onClick={() => handleChoosePlayer(player)}
                    >{player.getName()}
                    </button>
                )
            }
            {message}
        </MainContainer>
    )
}