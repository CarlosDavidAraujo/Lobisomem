import styled from 'styled-components';
import werewolfImg from '../Images/lobisomem.png';

const Card = styled.div`
    aspect-ratio: 1/1;
    background-color: #F5F5DC;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ClassImg = styled.div`
    width: 70%;
    height: 70%;
    & img {
        width: 70px;
        height: 40px;
        z-index: 1;
    }
`;

const NumberControl = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    & button {
        background-color: red;
        width: 20%;
        aspect-ratio: 1/1;
    }
`;

export default function ClassCard({roleName, count, onMinus, onPlus, onClick}) {
    return (
        <Card onClick={onClick}>
            <ClassImg>    
                <img src={werewolfImg} />     
            </ClassImg>
            <h5>{roleName}</h5>
            <h5>{count}</h5>
            <NumberControl>
                <button onClick={onMinus}>-</button>
                <button onClick={onPlus}>+</button>
            </NumberControl>
        </Card>
    )
}