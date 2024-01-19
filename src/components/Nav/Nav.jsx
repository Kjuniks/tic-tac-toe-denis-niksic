import React from 'react'
import { StyledNav } from './Nav.styled'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Title } from '../../styles/Common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import { logoutUser } from '../../api/auth';
import { deleteAuthorizationToken } from '../../api/api';
import { deleteUserData, setShowGameBoard } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrentGame } from '../../redux/gamesSlice';

function Nav() {
    const { username } = useSelector((state) => state.user.data)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            if (response.status === 200) {
                deleteAuthorizationToken()
                dispatch(deleteUserData())
                navigate("/")
            } else {
                const errorData = response.data
                console.error("Logout failed:", errorData)
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    const handleNewGameClick = () => {
        dispatch(setShowGameBoard({ showBoard: true, newGame: true }))
        dispatch(setCurrentGame({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
        }))
    }

    return (
        <StyledNav>
            <Title>Welcome back {username}!</Title>
            <ul>
                <li onClick={handleNewGameClick}>
                    <AddCircleOutlineIcon />
                    <span>New Game</span>
                </li>
                <li onClick={() => dispatch(setShowGameBoard({ showBoard: false, newGame: false }))}>
                    <HistoryIcon />
                    <span>Recent Games</span>
                </li>
                <li>
                    <Button onClick={handleLogout}>Logout</Button>
                </li>
            </ul>
        </StyledNav>
    )
}

export default Nav