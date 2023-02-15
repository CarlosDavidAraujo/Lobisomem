import styled from "styled-components";
import PlusIcon from "./PlusIcon";
import pena from "../Images/pena.png";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5deb3;
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
  height: 30px;
  margin-top: 20px;

  & img {
    width: 80%;
  }
`;

const Input = styled.input`
  max-width: 80px;
  margin-top: 15px;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
  text-align: center;
  font-family: "New Rocker", cursive;
  font-size: 18px;
`;

export default function PlayerCard({ player, onChange, onClick, placeholder }) {
  return (
    <Card>
      <Portrait>
        <img src={pena} />
      </Portrait>
      <Input
        value={player}
        onChange={onChange}
        placeholder="Adicione um nome"
      />
      <button onClick={onClick}>
        <PlusIcon />
      </button>
    </Card>
  );
}
