import React, { useEffect, useState } from 'react'
import { StyledWinLine } from './WinLine.styled'
import { useSelector } from 'react-redux'

function WinLine() {
    const [lineDirection, setLineDirection] = useState("")
    const { board, winner } = useSelector((state) => state.games.currentGame)

    function checkWinner(grid, playerId) {
        function checkLine(a, b, c, rowIndex, colIndex) {
            return a !== null && a === b && b === c && a === playerId
                ? { row: rowIndex + 1, column: colIndex + 1 }
                : null;
        }

        function checkRowWinner(row, rowIndex) {
            return checkLine(row[0], row[1], row[2], rowIndex, 0);
        }

        function checkColumnWinner(colIndex) {
            const column = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
            return checkLine(column[0], column[1], column[2], 0, colIndex);
        }

        // Check rows
        for (let i = 0; i < 3; i++) {
            const winner = checkRowWinner(grid[i], i);
            if (winner !== null) {
                setLineDirection(`row${winner.row}`)
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            const winner = checkColumnWinner(j);
            if (winner !== null) {
                setLineDirection(`column${winner.column}`)
            }
        }

        // Check diagonals
        if (checkLine(grid[0][0], grid[1][1], grid[2][2], 0, 0)) {
            setLineDirection(`diag-top-left`)
        }

        if (checkLine(grid[0][2], grid[1][1], grid[2][0], 0, 2)) {
            setLineDirection(`diag-top-right`)
        }
    }

    useEffect(() => {
        checkWinner(board, winner?.id)
        console.log(lineDirection)
    }, [])
    return (
        <StyledWinLine lineDirection={lineDirection}></StyledWinLine>
    )
}

export default WinLine