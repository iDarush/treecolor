const treeNode = (label, level, size, color, parent = null) => ({
    label: label + "",
    level,
    left: null,
    right: null,
    parent,
    size,
    color,
    cx: 0,
    cy: 0,
});

export function makeTree(depth = 1, nodeSize = 50, color = "") {
    let idSequence = 0;

    const leafCount = Math.pow(2, depth - 1);
    const width = leafCount * nodeSize + (leafCount - 1) * nodeSize;

    const rootId = 1;
    const root = {
        ...treeNode(idSequence++, rootId, nodeSize, color),
        cx: width / 2,
        cy: rootId * nodeSize - nodeSize / 2,
    };

    const nodes = {
        [root.label]: root,
    };
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        if (node.level + 1 <= depth) {
            // чем ближе к корню дерева - тем дальше друг от друга находятся узлы одного уровня
            const levelOffcet = Math.pow(2, depth - node.level - 1) - 1;
            const cxOffcet = (levelOffcet + 1) * nodeSize;

            const left = {
                ...treeNode(idSequence++, node.level + 1, nodeSize, color, node.label),
                cx: node.cx - cxOffcet,
                cy: node.cy + nodeSize,
            };
            node.left = left.label;

            const right = {
                ...treeNode(idSequence++, node.level + 1, nodeSize, color, node.label),
                cx: node.cx + cxOffcet,
                cy: node.cy + nodeSize,
            };
            node.right = right.label;

            queue.push(left, right);

            nodes[left.label] = left;
            nodes[right.label] = right;
        }
    }

    return nodes;
}
