import styled from "styled-components";
import { popAnimation } from "../../styles/Common";

export const StyledGameBoard = styled.div`
position: relative;
border: 1px solid ${({ theme }) => theme.colors.accent};
margin-bottom: 8px;
@media (max-width: ${({ theme }) => theme.mobile.medium}) {
        width: 400px;
  }

  @media (max-width: ${({ theme }) => theme.mobile.small}) {
        width: 280px;
  }

  @media (max-width: ${({ theme }) => theme.mobile.phone}) {
        width: 100%;
        margin-top: 20px;
  }

  animation: ${popAnimation} 300ms ease-out;
`

export const GridRow = styled.div`
display: flex;
`;

export const GridCell = styled.div`
border: 1px solid ${({ theme }) => theme.colors.accent};
cursor: pointer;

&:hover {
  background-color: #292929;
}

`;

export const Cross = styled.div`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.accent};
    & > svg {
        width: 100%;
        height: 100%;
    }
`

export const Circle = styled.div`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.secondary};
    & > svg {
        width: 100%;
        height: 100%;
    }
`

export const Empty = styled.div`
    width: 100%;
    height: 100%;
    color: transparent;
    & > svg {
        width: 100%;
        height: 100%;
    }
`

