import { useCallback, useState } from "react";
import { Line } from "./Line";
import { Node } from "./Node";

export const Tree = ({ nodes, selectedId, onNodeSelected, onNodeMoved }) => {
    const [draggable, setDraggable] = useState(null);

    const onMouseDown = useCallback((e) => {
        if (e.target.dataset.nodeId) {
            setDraggable({ node: e.target.dataset.nodeId, x: e.clientX, y: e.clientY });
        }
    }, []);

    const onMouseUp = useCallback((e) => {
        setDraggable(null);
    }, []);

    const onDrag = useCallback(
        (e) => {
            if (draggable) {
                const { clientX, clientY } = e;
                const dx = clientX - draggable.x;
                const dy = clientY - draggable.y;

                setDraggable({ node: draggable.node, x: clientX, y: clientY });
                onNodeMoved(draggable.node, dx, dy);
            }
        },
        [draggable, onNodeMoved]
    );

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

    const nodesArray = Object.values(nodes);

    const edges = nodesArray
        .filter((node) => !!node.parent)
        .map((node) => {
            const begin = nodes[node.parent];
            return <Line key={node.label} begin={begin} end={node} />;
        });

    const leafs = nodesArray.map((node) => {
        return <Node key={node.label} node={node} selected={node.label === selectedId} />;
    });

    return (
        <svg
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onDrag}
            className="tree"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {edges}
            {leafs}
        </svg>
    );
};
