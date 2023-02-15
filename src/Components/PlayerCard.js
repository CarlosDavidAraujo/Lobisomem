import styled from "styled-components";
import PlusIcon from "./PlusIcon";

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#F5F5DC;
    padding: 15px;
    border-radius: 2px;
    border: 3px solid black;
 
    & button {
        position: absolute;
        top: -8px;
        right: 3px;
        font-size: 18px;
        background-color: transparent;
        border: none;

        & h1 {
            font-size: 40px;
            transform: rotate(45deg);
        }
    }
`;

const Portrait = styled.div`
    width: 50px;
    height: 60px;
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
`;

const Input = styled.input`
    max-width: 80px;
    margin-top: 15px;
    background-color: transparent;
    outline: none;
    border: none;
    color: black;
    text-align: center;
    font-family: 'New Rocker', cursive; 
    font-size: 18px;
`;

export default function PlayerCard({ player, onChange, onClick, placeholder }) {
    return (
        <Card>
            <Portrait>
                <i class="fa-solid fa-feather"></i>
            </Portrait>
            <Input value={player} onChange={onChange} placeholder="Adicione um nome" />
            <button onClick={onClick}>
                <PlusIcon />
            </button>
        </Card>
    )
}