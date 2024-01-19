import styled from "styled-components";

export const StyledGameBoardInfo = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.secondary};
    white-space: nowrap;
    @media (max-width: ${({ theme }) => theme.mobile.small}) {
        width: 280px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.phone}) {
        width: 100%;
  }
`

export const StyledGameBoardInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    & > div {
        display: flex;
        align-items: center;
        margin: 0 6px;
        & > svg{
            font-size: 34px;
            margin: 0 4px;
        }
    }
    
`

export const StyledGameBoardInfoFirstPlayer = styled.div`
    color: ${({ theme }) => theme.colors.accent};
`

export const StyledGameBoardInfoSecondPlayer = styled.div`
    color: ${({ theme }) => theme.colors.secondary};
`