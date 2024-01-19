import React, { useEffect } from 'react'
import { GameItem, GameItemList } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGame, getInProgressGames } from '../../api/games';
import { setCurrentGame, setInProgressGames } from '../../redux/gamesSlice';
import { useTimeNow } from '../../contexts/TimeNow';
import { setShowGameBoard } from '../../redux/userSlice';

function InProgressGamesList() {
  const { timeNow } = useTimeNow();

  const inProgressGames = useSelector((state) => state.games.inProgressGames)

  const dispatch = useDispatch();

  async function fetchSelectedGame(id) {
    try {
      const response = await getCurrentGame(id)
      dispatch(setCurrentGame(response.data))
      dispatch(setShowGameBoard({showBoard: true, newGame: false}))
    } catch (error) {
      console.error("Error fetching current game from in progress games list: ", error)
    }
  }

  async function fetchInProgressGames() {
    try {
      const inProgressGameData = await getInProgressGames();
      dispatch(setInProgressGames(inProgressGameData))
    } catch (error) {
      console.error("Error fetching in progress games:", error)
    }
  }

  useEffect(() => {
    fetchInProgressGames()

    const fetchInProgressGamesInterval = setInterval(() => {
      fetchInProgressGames()
    }, 10000);

    return () => {
      clearInterval(fetchInProgressGamesInterval)
    }
  }, [])

  return (
    <GameItemList>
      <h2>In Progress</h2>
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

export default InProgressGamesList