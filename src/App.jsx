import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import Home from "./pages/Home/Home"
import theme from "./styles/Theme"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "./styles/Global"
import { TimeNowProvider } from "./contexts/TimeNow"

function App() {

  return (
    <Router>
      <TimeNowProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </TimeNowProvider>
    </Router>
  )
}

export default App
