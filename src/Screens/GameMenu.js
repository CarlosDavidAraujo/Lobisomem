import { useContext } from "react";
import styled from "styled-components";
import {Button} from "../Components/Button";
import { GameContext } from "../Context/GameContext";
import menuImage from '../Images/menuImage.png';

const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & h2 {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translateX(-50%);
        color: #ffffff;
        font-size: 35px;
        text-align: center;
    }

    & button {
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translateX(-50%);
    }

`;

export default function GameMenu() {
    const { setScreen } = useContext(GameContext);

    return (
        <Container>
            <img src={menuImage} alt="dark forest" />
            <h2>Nightfall Village</h2>
            <Button onClick={() => setScreen('definePlayers')}>Iniciar Novo Jogo</Button>
        </Container>
    )
}