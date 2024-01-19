import styled from "styled-components";

export const StyledHome = styled.section`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.primary};
`