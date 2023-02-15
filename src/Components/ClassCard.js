import styled from "styled-components";

const Card = styled.div`
  padding: 10px 0;
  background-color: #f5deb3;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;

const ClassImg = styled.div`
  border: 2px solid black;
  & img {
    width: 70px;
    border-radius: 50%;
  }
`;

const NumberControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  & button {
    background-color: transparent;
    border: none;
    width: 20%;
    aspect-ratio: 1/1;
    font-size: 30px;
  }
`;

export default function ClassCard({
  roleName,
  count,
  onMinus,
  onPlus,
  onClick,
  img,
}) {
  return (
    <Card onClick={onClick}>
      <ClassImg>
        <img src={img} />
      </ClassImg>
      <h5>{roleName}</h5>
      <h5>{count}</h5>
      <NumberControl>
        <button onClick={onMinus}>-</button>
        <button onClick={onPlus}>+</button>
      </NumberControl>
    </Card>
  );
}
