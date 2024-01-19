import styled from "styled-components";

export const StyledNav = styled.nav`
    width: 1100px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    & > ul{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    & > ul > li {
        display: flex;
        align-items: center;
        margin-left: 60px;
        cursor: pointer;
        @media (max-width: ${({ theme }) => theme.mobile.phone}) {
            margin-left: 30px;
            margin-top: 14px;
        }
    }
    & > ul > li > span {
        color: ${({ theme }) => theme.colors.secondary};
    }

    & > ul > li > svg {
        color: ${({ theme }) => theme.colors.accent};
        margin-right: 4px;
    }

    @media (max-width: ${({ theme }) => theme.mobile.small}) {
        flex-direction: column;
  }
`