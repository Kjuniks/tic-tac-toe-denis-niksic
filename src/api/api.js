import axios from "axios";

export const api = axios.create({
    baseURL: "https://tictactoe.aboutdream.io",
    headers: {
        'Content-Type': 'application/json',
    }
})

export const setAuthorizationToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const deleteAuthorizationToken = () => {
    delete api.defaults.headers.common["Authorization"];
}