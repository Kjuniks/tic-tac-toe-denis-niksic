import React from 'react'
import { StyledGameBoardInfo, StyledGameBoardInfoFirstPlayer, StyledGameBoardInfoSecondPlayer, StyledGameBoardInfoWrapper } from './GameBoardInfo.styled'
import { useDispatch, useSelector } from 'react-redux'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../styles/Common';
import { createNewGame, getCurrentGame, joinGame } from '../../api/games';
import { setCurrentGame } from '../../redux/gamesSlice';
import { setShowGameBoard } from '../../redux/userSlice';

function GameBoardInfo() {
    const { username } = useSelector((state) => state.user.data)
    const { newGame } = useSelector((state) => state.user.showGameBoard)
    const { id, first_player, second_player, status, winner } = useSelector((state) => state.games.currentGame)

    const dispatch = useDispatch();

    const handleCreateNewGame = async () => {
        try {
            const response = await createNewGame();
            const gameId = response.data.id;
            try {
                const currentGameResponse = await getCurrentGame(gameId)
                dispatch(setCurrentGame(currentGameResponse.data))
                dispatch(setShowGameBoard({ showBoard: true, newGame: false }))
            } catch (error) {
                console.error("Error fetching current game after starting new game: ", error)
            }
        } catch (error) {
            console.error("Error creating new game:", error);
        }
    }

    const handleJoinGame = () => {
        try {
            joinGame(id)
        } catch (error) {
            console.error("Error joining game:", error);
        }
    }

    return (
        <StyledGameBoardInfo>
            {
                newGame ? <Button onClick={handleCreateNewGame}>Open new game</Button> :
                    status === "open" ?
                        <>
                            <StyledGameBoardInfoWrapper>
                                {first_player?.username === username ? //Show user to wait for second player if he created current game
                                    <h3>Waiting for second player</h3> :
                                    <>
                                        <h3>Started by</h3>
                                        <StyledGameBoardInfoFirstPlayer>
                                            <h3>{first_player?.username}</h3>
                                        </StyledGameBoardInfoFirstPlayer>
                                    </>
                                }
                            </StyledGameBoardInfoWrapper>
                            {first_player?.username !== username && <Button onClick={handleJoinGame}>Join</Button>}
                        </>
                        :
                        status === "progress" ?
                            <>
                                <StyledGameBoardInfoWrapper>
                                    <StyledGameBoardInfoFirstPlayer>
                                        <CloseIcon />
                                        <h3>{first_player?.username}</h3>
                                    </StyledGameBoardInfoFirstPlayer>
                                    <h3>vs</h3>
                                    <StyledGameBoardInfoSecondPlayer>
                                        <h3>{second_player?.username}</h3>
                                        <PanoramaFishEyeIcon />
                                    </StyledGameBoardInfoSecondPlayer>
                                </StyledGameBoardInfoWrapper>
                                <p>{first_player?.username === username || second_player?.username === username ? "" : "Spectating"}</p>
                            </> :
                            status === "finished" &&
                            <>
                                <StyledGameBoardInfoWrapper>
                                    <StyledGameBoardInfoFirstPlayer>
                                        <CloseIcon />
                                        <h3>{first_player?.username}</h3>
                                    </StyledGameBoardInfoFirstPlayer>
                                    <h3>vs</h3>
                                    <StyledGameBoardInfoSecondPlayer>
                                        <h3>{second_player?.username}</h3>
                                        <PanoramaFishEyeIcon />
                                    </StyledGameBoardInfoSecondPlayer>
                                </StyledGameBoardInfoWrapper>

                                {winner?.username === first_player?.username ?
                                    <StyledGameBoardInfoWrapper>
                                        <StyledGameBoardInfoFirstPlayer>
                                            {first_player?.username}
                                        </StyledGameBoardInfoFirstPlayer>
                                        <p>won!</p>
                                    </StyledGameBoardInfoWrapper> :
                                    winner?.username === second_player?.username ?
                                        <StyledGameBoardInfoWrapper>
                                            <StyledGameBoardInfoSecondPlayer>
                                                {second_player?.username}
                                            </StyledGameBoardInfoSecondPlayer>
                                            <p>won!</p>
                                        </StyledGameBoardInfoWrapper> :
                                        "Tie!"}

                            </>


            }
        </StyledGameBoardInfo>
    )
}

export default GameBoardInfo