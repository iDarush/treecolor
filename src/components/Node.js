const BORDER_WIDTH = 2;

export const Node = ({ node, selected }) => {
    const { cx, cy, size, color, label } = node;
    const radius = size / 2 - BORDER_WIDTH / 2;

    return (
        <>
            <g className="tree-node">
                <circle
                    className="tree-node_leaf"
                    strokeWidth={BORDER_WIDTH}
                    stroke={selected ? "black" : color}
                    fill={color}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    data-node-id={label}
                />
                <text
                    className="tree-node_text"
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    data-node-id={label}
                >
                    {label}
                </text>
            </g>
        </>
    );
};
