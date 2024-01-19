import styled from "styled-components";

export const StyledWinLine = styled.div`
    position: absolute;
    top: ${({ lineDirection }) => lineDirection === "row1" ? "16%" : lineDirection === "row2" ? "50%" : lineDirection === "row3" ? "83%" : "6%"};
    left: ${({ lineDirection }) => lineDirection === "column1" ? "16%" : lineDirection === "column2" ? "50%" : lineDirection === "column3" ? "83%" : lineDirection === "diag-top-right" || lineDirection === "diag-top-left" ? "50%" : "16%"};
    ${({ lineDirection }) => lineDirection === "row1" || lineDirection === "row2" || lineDirection === "row3" ? "width: 68%" : null};
    ${({ lineDirection }) => lineDirection === "column1" || lineDirection === "column2" || lineDirection === "column3" ? "bottom: 6%" : null};
    ${({ lineDirection }) => lineDirection === "column1" || lineDirection === "column2" || lineDirection === "column3" || lineDirection === "diag-top-right" || lineDirection === "diag-top-left" ? "bottom: 6%" : null};
    ${({ lineDirection }) => lineDirection === "diag-top-right" ? "transform:rotate(45deg)" : lineDirection === "diag-top-left" ? "transform:rotate(-45deg)" : null};
    border: 2px solid whitesmoke;
`