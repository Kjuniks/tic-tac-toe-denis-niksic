import { api } from "./api"

export const getCurrentGame = (id) => {
    return api.get(`/games/${id}/`)
}

export const getOpenGames = async () => {
    try {
        const response = await api.get("/games/?status=open")
        return response.data.results
    } catch (error) {
        throw new Error(`Error fetching open games: ${error}`)
    }
}

export const getInProgressGames = async () => {
    try {
        const response = await api.get("/games/?status=progress")
        return response.data.results
    } catch (error) {
        throw new Error(`Error fetching in progress games: ${error}`)
    }
}

export const getFinishedGames = async () => {
    try {
        const response = await api.get("/games/?status=finished")
        return response.data.results
    } catch (error) {
        throw new Error(`Error fetching in progress games: ${error}`)
    }
}

export const createNewGame = () => {
    try {
        return api.post("/games/")
    } catch (error) {
        throw new Error(`Error creating new game: ${error}`)
    }
}

export const joinGame = (gameId) => {
    try {
        return api.post(`/games/${gameId}/join/`)
    } catch (error) {
        throw new Error(`Error joining game: ${error}`)
    }
}

export const makeMove = (gameId, move) => {
    try {
        return api.post(`/games/${gameId}/move/`, move)
    } catch (error) {
        throw new Error(`Error making a move: ${error}`)
    }
}