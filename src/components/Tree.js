import { useCallback } from "react";
import { Line } from "./Line";
import { Node } from "./Node";

const PADDING = 2;

export const Tree = ({ nodes, width, height, selectedId, onNodeSelected }) => {
    const onClick = useCallback(
        (e) => {
            if (e.target.dataset.nodeId) {
                onNodeSelected(e.target.dataset.nodeId);
            } else {
                onNodeSelected(null);
            }
        },
        [onNodeSelected]
    );

    const edges = nodes
        .filter((node) => !!node.parent)
        .map((node) => <Line key={node.label} begin={node.parent} end={node} />);

    const leafs = nodes.map((node) => {
        return <Node key={node.label} node={node} selected={node.label === selectedId} />;
    });

    return (
        <svg
            onClick={onClick}
            className="tree"
            width={width + PADDING}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={`0 0 ${width + PADDING} ${height + PADDING}`}
        >
            {edges}
            {leafs}
        </svg>
    );
};
