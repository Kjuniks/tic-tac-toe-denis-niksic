import styled, { keyframes } from "styled-components"

export const fadeInAnimation = keyframes`
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const popAnimation = keyframes`
0% {
  scale: 0.9;
}
60% {
  scale: 1.08;
}
100% {
  scale: 1;
}
`;


export const ContainerRow = styled.div`
    width: 1100px;
    max-width: 100%;
    padding: 40px 20px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    ${({ direction }) => direction && `flex-direction: ${direction};`}
    ${({ jcontent }) => jcontent && `justify-content: ${jcontent};`}
    ${({ aitems }) => aitems && `align-items: ${aitems};`}

    & > div{
        display: flex;
        flex-direction:column;
        flex: 1;
        margin: 0 18px;
    }
`

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 28px;

    @media (max-width: ${({ theme }) => theme.mobile.small}) {
        font-size: 26px;
  }

  animation: ${fadeInAnimation} 1000ms ease;
`

export const Button = styled.button`
    color: whitesmoke;
    background-color: ${({ theme }) => theme.colors.accent};
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
`

export const Span = styled.span`
 color: #f06449;
 cursor: pointer;
`