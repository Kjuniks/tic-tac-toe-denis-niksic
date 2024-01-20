import styled from "styled-components";
import { fadeInAnimation } from "../../styles/Common";

export const GameItemList = styled.ul`
    flex: 1;
    width: calc(100% / 3);
    margin: 0 18px;
    color: ${({ theme }) => theme.colors.secondary};
    white-space: nowrap;
    width: fit-content;
    & > li {
        list-style-type: none;
    }

    @media (max-width: ${({ theme }) => theme.mobile.phone}) {
        margin-top: 14px;
  }
  animation: ${fadeInAnimation} 200ms ease;
`

export const GameItem = styled.div`
margin-top: 8px;
padding: 6px 10px;
border: 1px solid ${({ theme }) => theme.colors.accent};
border-radius: 8px;
cursor: pointer;

& > span {
    font-size: 12px;
}
`