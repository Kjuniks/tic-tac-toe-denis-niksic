import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGame, getFinishedGames } from '../../api/games';
import { setCurrentGame, setFinishedGames } from '../../redux/gamesSlice';
import { GameItem, GameItemList } from './styles';
import { useTimeNow } from '../../contexts/TimeNow';
import { setShowGameBoard } from '../../redux/userSlice';

function FinishedGamesList() {
    const { timeNow } = useTimeNow();

    const inProgressGames = useSelector((state) => state.games.finishedGames)

    const dispatch = useDispatch();

    async function fetchSelectedGame(id) {
        try {
            const response = await getCurrentGame(id)
            dispatch(setCurrentGame(response.data))
            dispatch(setShowGameBoard({showBoard: true, newGame: false}))
        } catch (error) {
            console.error("Error fetching current game from finished games list: ", error)
        }
    }

    async function fetchFinishedGames() {
        try {
            const finishedGameData = await getFinishedGames();
            dispatch(setFinishedGames(finishedGameData))
        } catch (error) {
            console.error("Error fetching finished games:", error)
        }
    }

    useEffect(() => {
        fetchFinishedGames()

        const fetchFinishedGamesInterval = setInterval(() => {
            fetchFinishedGames()
        }, 10000);

        return () => {
            clearInterval(fetchFinishedGamesInterval)
        }
    }, [])

    return (
        <GameItemList>
            <h2>Recent Games</h2>
            {inProgressGames.length === 0 || !inProgressGames ?
                <p>No games to show :(</p> :
                inProgressGames.map((game, index) => {
                    const timeSinceGameCreated = new Date(game.created);

                    const timeDifferenceInSeconds = Math.floor((timeNow - timeSinceGameCreated) / 1000);

                    const minutes = Math.floor(timeDifferenceInSeconds / 60);
                    const hours = Math.floor(minutes / 60);

                    const remainingMinutes = minutes % 60;
                    const remainingSeconds = timeDifferenceInSeconds % 60;
                    return (
                        <li key={index}>
                            <GameItem onClick={() => fetchSelectedGame(game.id)}>
                                <p>{game.first_player?.username} vs {game.second_player?.username}</p>
                                <span>{!game.winner ? "Tie" : game.winner.username + " won"} </span>
                                {hours > 0 && <span>{hours} Hour{hours > 1 ? 's' : ''}</span>}
                                {" "}
                                {remainingMinutes > 0 && <span>{remainingMinutes} Minute{remainingMinutes > 1 ? 's' : ''}</span>}
                                {" "}
                                <span>{remainingSeconds} Second{remainingSeconds > 1 ? 's' : ''} Ago</span>
                            </GameItem>
                        </li>
                    )
                })}
        </GameItemList>
    )
}

export default FinishedGamesList