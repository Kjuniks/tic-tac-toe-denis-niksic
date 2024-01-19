import React, { createContext, useContext, useEffect, useState } from 'react'

const TimeNowContext = createContext();

export const TimeNowProvider = ({ children }) => {
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        const timeNowInterval = setInterval(() => {
            setTimeNow(new Date());
        }, 1000)

        return () => clearInterval(timeNowInterval);
    }, [])
    return (
        <TimeNowContext.Provider value={{ timeNow }}>
            {children}
        </TimeNowContext.Provider>
    )
}

export const useTimeNow = () => {
    const context = useContext(TimeNowContext);
    if (!context) {
        console.log("useTimeNow must be used within a TimeNowProvider")
    }
    return context
}
