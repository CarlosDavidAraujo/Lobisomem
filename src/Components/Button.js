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

const StyledSkillButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & button {
    width: 50px;
    height: 50px;
    background-color: transparent;
    background-image: url(${props => props.icon});
    background-repeat: no-repeat;
    background-size: cover;
    border: 2px solid black;
    border-radius: 2px;
    box-shadow: 2px 2px 0 0 black;
  }

  & button:active {
    box-shadow: none;
    transform: translate(2px, 2px);
  }
  
  & img {
        width: 100%;
    }
`;

function SkillButton({ label, icon, onClick }) {
  return (
    <StyledSkillButton icon={icon}>
      <button onClick={onClick} />
      <p>{label}</p>
    </StyledSkillButton>
  )
}



export { Button, AddPlayerButton, SkillButton };
