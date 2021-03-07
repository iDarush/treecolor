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

    const leafCont = Math.pow(2, depth - 1);
    const width = leafCont * nodeSize + (leafCont - 1) * nodeSize;

    const rootId = 1;
    const root = {
        ...treeNode(idSequence++, rootId, nodeSize, color),
        cx: width / 2,
        cy: rootId * nodeSize - nodeSize / 2,
    };

    const nodes = [root];
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        if (node.level + 1 <= depth) {
            // чем ближе к корню дерева - тем дальше друг от друга находятся узлы одного уровня
            const levelOffcet = Math.pow(2, depth - node.level - 1) - 1;
            const cxOffcet = (levelOffcet + 1) * nodeSize;

            node.left = {
                ...treeNode(idSequence++, node.level + 1, nodeSize, color, node),
                cx: node.cx - cxOffcet,
                cy: node.cy + nodeSize,
            };

            node.right = {
                ...treeNode(idSequence++, node.level + 1, nodeSize, color, node),
                cx: node.cx + cxOffcet,
                cy: node.cy + nodeSize,
            };

            queue.push(node.left, node.right);
            nodes.push(node.left, node.right);
        }
    }

    return { width, height: depth * nodeSize, nodes };
}
