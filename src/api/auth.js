import { api } from "./api"

export const authenticateUser = (authMode, credentials) => { //authMode is either "login" or "register"
    return api.post(`/${authMode}/`, credentials)
}

export const logoutUser = () => {
    return api.post("/logout/")
}