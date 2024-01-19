import React, { useEffect } from 'react'
import { GameItem, GameItemList } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentGame, setOpenGames } from '../../redux/gamesSlice';
import { getCurrentGame, getOpenGames } from '../../api/games';
import { useTimeNow } from '../../contexts/TimeNow';
import { setShowGameBoard } from '../../redux/userSlice';

function OpenGamesList() {
    const { timeNow } = useTimeNow();

    const openGames = useSelector((state) => state.games.openGames)

    const dispatch = useDispatch();

    async function fetchSelectedGame(id) {
        try {
            const response = await getCurrentGame(id)
            dispatch(setCurrentGame(response.data))
            dispatch(setShowGameBoard({showBoard: true, newGame: false}))
        } catch (error) {
            console.error("Error fetching current game from open games list: ", error)
        }
    }

    async function fetchOpenGames() {
        try {
            const openGamesData = await getOpenGames();
            dispatch(setOpenGames(openGamesData))
        } catch (error) {
            console.error("Error fetching open games: ", error)
        }
    }

    useEffect(() => {
        fetchOpenGames()

        const fetchOpenGamesInterval = setInterval(() => {
            fetchOpenGames()
        }, 10000);

        return () => {
            clearInterval(fetchOpenGamesInterval)
        }
    }, [])

    return (
        <GameItemList>
            <h2>Open Games</h2>
            {openGames.length === 0 || !openGames ?
                <p>No games to show :(</p> :
                openGames.map((game, index) => {
                    const timeSinceGameCreated = new Date(game.created);

                    const timeDifferenceInSeconds = Math.floor((timeNow - timeSinceGameCreated) / 1000);

                    const minutes = Math.floor(timeDifferenceInSeconds / 60);
                    const hours = Math.floor(minutes / 60);

                    const remainingMinutes = minutes % 60;
                    const remainingSeconds = timeDifferenceInSeconds % 60;
                    return (
                        <li key={index}>
                            <GameItem onClick={() => fetchSelectedGame(game.id)}>
                                <p>Started by: {game.first_player?.username}</p>
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

export default OpenGamesList