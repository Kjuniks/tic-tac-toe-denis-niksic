import { createSlice } from '@reduxjs/toolkit'

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        openGames: [],
        inProgressGames: [],
        finishedGames: [],
        currentGame: {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
        },
    },
    reducers: {
        setOpenGames: (state, action) => {
            state.openGames = action.payload
        },
        setInProgressGames: (state, action) => {
            state.inProgressGames = action.payload
        },
        setFinishedGames: (state, action) => {
            state.finishedGames = action.payload
        },
        setCurrentGame: (state, action) => {
            state.currentGame = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOpenGames, setInProgressGames, setFinishedGames, setCurrentGame } = gamesSlice.actions

export default gamesSlice.reducer