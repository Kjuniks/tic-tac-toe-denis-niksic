import styled from "styled-components"
import { fadeInAnimation } from "../../styles/Common"

export const StyledForm = styled.form`
    width: 100%;
    max-width: 350px;
    margin-top: 22px;
    color: ${({ theme }) => theme.colors.secondary};
    & > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    animation: ${fadeInAnimation} 1000ms ease;
`

export const StyledLabel = styled.label`
margin-bottom: 8px;

`

export const StyledInput = styled.input`
    color: ${({ theme }) => theme.colors.secondary};
    padding: 12px 8px;
    background-color: transparent;
    border: 1px solid whitesmoke;
    border-radius: 8px;
`
export const AuthErrorMessage = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 4px;
`

export const ToggleText = styled.div`
    text-align: center;
    margin-top: 8px;
`
