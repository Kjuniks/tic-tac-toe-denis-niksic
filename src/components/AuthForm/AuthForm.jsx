import React, { useState } from 'react'
import { AuthErrorMessage, StyledForm, StyledInput, StyledLabel, ToggleText } from './AuthForm.styled'
import { Button, Span } from '../../styles/Common'
import { authenticateUser } from '../../api/auth'
import { setAuthorizationToken } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/userSlice'

function AuthForm() {
    const [authMode, setAuthMode] = useState("login") //Values: "login" or "register". This changes UI layout and API endpoint.
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeAuthMode = (mode) => {
        setAuthMode(mode);
        setAuthErrorMessage("");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials, [name]: value,
        }))

        if (authMode === "register" && name === "repeatPassword") {
            setRepeatPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }
        if (authMode === "register" && repeatPassword !== credentials.password) {
            setAuthErrorMessage("Passwords don't match!")
            return
        }

        try {
            setLoading(true)

            const response = await authenticateUser(authMode, credentials);

            //when the user successfully makes an account, returned data is empty string "". When user LOGIN it returns an object
            //with that being said, when response.data is "" (empty string), we redirect the user to log in, because API doesnt support automatic log in after registration
            if (response.data !== "") {
                setAuthorizationToken(response.data.token)
                dispatch(setUserData(response.data))
                navigate("/home")
            } else {
                changeAuthMode("login")
            }
        } catch (error) {
            console.error("Auth error:", error)
            setAuthErrorMessage("Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <div>
                <StyledLabel>Username</StyledLabel>
                <StyledInput type="text" name="username" value={credentials.username} onChange={handleChange} required />
            </div>
            <div>
                <StyledLabel>Password</StyledLabel>
                <StyledInput type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            {authMode === "register" &&
                <div>
                    <StyledLabel>Repeat Password</StyledLabel>
                    <StyledInput type="password" name="repeatPassword" value={repeatPassword} onChange={handleChange} required />
                </div>
            }
            <AuthErrorMessage>{authErrorMessage}</AuthErrorMessage>
            <div>
                <Button type='submit'>{loading ? `${authMode.charAt(0).toUpperCase() + authMode.slice(1)} in progress...` : `${authMode.charAt(0).toUpperCase() + authMode.slice(1)}`}</Button>
                {authMode === "register" ?
                    <ToggleText>
                        Already have an account?{" "}<Span onClick={() => changeAuthMode("login")}>Login</Span>
                    </ToggleText>
                    :
                    <ToggleText>
                        Don't have an account?{" "}<Span onClick={() => changeAuthMode("register")}>Register</Span>
                    </ToggleText>
                }
            </div>
        </StyledForm>
    )
}

export default AuthForm