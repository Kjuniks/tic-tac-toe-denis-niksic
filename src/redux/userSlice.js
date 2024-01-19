import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            token: "",
            username: "",
            id: 0
        },
        showGameBoard: {showBoard: false, newGame: false},
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload
        },
        deleteUserData: (state) => {
            state.data = {
                token: "",
                username: "",
                id: 0
            }
        },
        setShowGameBoard: (state, action) => {
            state.showGameBoard = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserData, deleteUserData, setShowGameBoard } = userSlice.actions

export default userSlice.reducer