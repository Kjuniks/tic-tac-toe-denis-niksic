import React, { useEffect } from 'react'
import { StyledHome } from './Home.styled'
import { ContainerRow } from '../../styles/Common'
import Nav from '../../components/Nav/Nav'
import GameBoard from '../../components/GameBoard/GameBoard'
import OpenGamesList from '../../components/GamesList/OpenGamesList'
import InProgressGamesList from '../../components/GamesList/InProgressGamesList'
import { useSelector } from 'react-redux'
import FinishedGamesList from '../../components/GamesList/FinishedGamesList'
import GameBoardInfo from '../../components/GameBoardInfo/GameBoardInfo'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { showBoard } = useSelector((state) => state.user.showGameBoard)
    const { token } = useSelector((state) => state.user.data)
    const navigate = useNavigate()

    useEffect(() => {
        //Redirect to the authentication page if token doesnt exist
        if (token === "") {
            navigate("/")
        }
    }, [])

    return (
        <StyledHome>
            <Nav />
            <ContainerRow direction="row" jcontent="center" aitems="start">
                <OpenGamesList />
                {showBoard ?
                    <div>
                        <GameBoard />
                        <GameBoardInfo />
                    </div> :
                    <FinishedGamesList />
                }
                <InProgressGamesList />
            </ContainerRow>
        </StyledHome>
    )
}

export default Home