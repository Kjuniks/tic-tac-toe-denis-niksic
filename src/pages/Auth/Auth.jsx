import React from 'react'
import { ContainerRow, Title } from '../../styles/Common'
import { StyledAuth } from './Auth.styled'
import AuthForm from '../../components/AuthForm/AuthForm'

function Auth() {
    return (
        <StyledAuth>
            <ContainerRow direction="column" jcontent="center" aitems="center">
                <Title>Tic-tac-toe by Denis Nikšić</Title>
                <AuthForm />
            </ContainerRow>
        </StyledAuth>
    )
}

export default Auth