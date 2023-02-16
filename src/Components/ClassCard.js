import styled from "styled-components";

const Card = styled.div`
  padding: 5px;
  background-color: #f5deb3;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  & button {
    background-color: transparent;
    border: none;
    width: 20%;
    aspect-ratio: 1/1;
    font-size: 30px;
    line-height: 0;
  }

  & .info {
    margin-left: auto;
    font-size: 20px;
    padding: 10px;
  }
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
  justify-content: space-between;
  
`;

export default function ClassCard({
    roleName,
    count,
    onMinus,
    onPlus,
    onClick,
    img,
    selected
}) {


    return (
        <Card onClick={onClick}>
            <button className="info">i</button>
            <ClassImg>
                <img src={img} />
            </ClassImg>
            <h5>{roleName}</h5>
            {selected &&
                <NumberControl>
                    <button onClick={onMinus}>-</button>
                    <h5>{count}</h5>
                    <button onClick={onPlus}>+</button>
                </NumberControl>
            }
        </Card>
    );
}
