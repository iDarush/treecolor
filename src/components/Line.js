export const Line = ({ begin, end }) => {
    return <line x1={begin.cx} y1={begin.cy} x2={end.cx} y2={end.cy} stroke="black" />;
};
