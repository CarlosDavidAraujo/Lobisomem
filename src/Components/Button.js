import styled from "styled-components";

const Button = styled.button`
  background-color: #1c1c1c;
  border: none;
  color: #ffffff;
  border-radius: 0;
  border: 2px solid white;
  font-size: 18px;
  padding: 5px 10px;
`;

const AddPlayerButton = styled.button`
  position: relative;
  background-color: #f5deb3;
  opacity: 80%;
  border: 3px solid black;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  & h1 {
    font-size: 100px;
    margin-bottom: -25px;
    margin-top: -15px;
  }
`;

export { Button, AddPlayerButton };
