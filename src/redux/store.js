import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import gamesReducer from "./gamesSlice.js"

export default configureStore({
    reducer: {
        user: userReducer,
        games: gamesReducer,
    },
})