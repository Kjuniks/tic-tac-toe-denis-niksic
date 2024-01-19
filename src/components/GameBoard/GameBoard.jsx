import React, { useEffect } from 'react'
import { Circle, Cross, Empty, GridCell, GridRow, StyledGameBoard } from './GameBoard.styled'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGame, joinGame, makeMove } from '../../api/games';
import { setCurrentGame } from '../../redux/gamesSlice';
import WinLine from '../WinLine/WinLine';

function GameBoard() {
    const currentGame = useSelector((state) => state.games.currentGame)
    const dispatch = useDispatch();

    async function updateCurrentGame(id) {
        try {
            const response = await getCurrentGame(id)
            dispatch(setCurrentGame(response.data))
        } catch (error) {
            console.error("Error updating current game: ", error)
        }
    }

    const handleGridClick = async (row, col) => {
        if (currentGame.status === "open") {
            try {
                const joinGameResponse = await joinGame(currentGame.id)
                if (joinGameResponse.status === 200) {
                    try {
                        const moveResponse = await makeMove(joinGameResponse.data.id, { "row": row, "col": col })
                        console.log(moveResponse)
                    } catch (error) {
                        console.error("Failed to make a move:", error)
                    }
                }
            } catch (error) {
                console.log("Failed to join game:", error)
            }
        }

        if (currentGame.status === "progress") {
            try {
                const moveResponse = await makeMove(currentGame.id, { "row": row, "col": col })
            } catch (error) {
                console.error("Failed to make a move:", error)
            }
        }

    };

    useEffect(() => {
        //Update gameboard every second if its in progress or open. No need to update finished games since here's no activity
        if (currentGame?.status === "progress" || currentGame?.status === "open") {
            const updateCurrentGameInterval = setInterval(() => {
                updateCurrentGame(currentGame?.id)
            }, 1000);

            return () => {
                clearInterval(updateCurrentGameInterval)
            }
        }

    }, [currentGame])

    return (
        <StyledGameBoard>
            {currentGame.board.map((row, rowIndex) => (
                <GridRow key={rowIndex}>
                    {row.map((cellId, colIndex) => (
                        <GridCell
                            key={colIndex}
                            onClick={() => handleGridClick(rowIndex, colIndex)}>
                            {
                                cellId === currentGame?.first_player?.id ?
                                    <Cross>
                                        <CloseIcon />
                                    </Cross>
                                    :
                                    cellId === currentGame?.second_player?.id ?
                                        <Circle>
                                            <PanoramaFishEyeIcon />
                                        </Circle>
                                        :
                                        <Empty><CheckBoxOutlineBlankIcon clr="red" /></Empty>
                            }

                        </GridCell>
                    ))}
                </GridRow>
            ))}
            {currentGame?.status === "finished" && currentGame?.winner !== null && <WinLine />}
            
        </StyledGameBoard>
    )
}

export default GameBoard