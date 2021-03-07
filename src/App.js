import React from "react";
import "./App.css";
import { makeTree } from "./model/node";
import { Tree } from "./components/Tree";
import { DEFAULT_COLOR, Toolkit } from "./components/Toolkit";

const NODE_SIZE = 25;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        const initialDepth = 2;
        const initialColor = DEFAULT_COLOR;

        this.state = {
            selected: null,
            color: initialColor,
            depth: initialDepth,
            nodes: makeTree(initialDepth, NODE_SIZE, initialColor),
        };
    }

    render() {
        const { color, depth, selected, nodes } = this.state;

        return (
            <div className="app">
                <Toolkit color={color} depth={depth} onColorChanged={this.setColor} onDepthChanged={this.setDepth} />

                <div className="tree-wrapper">
                    <Tree
                        nodes={nodes}
                        selectedId={selected}
                        onNodeSelected={this.selectNode}
                        onNodeMoved={this.moveNode}
                    />
                </div>
            </div>
        );
    }

    selectNode = (id) => this.setState({ selected: id });

    moveNode = (id, dx, dy) => {
        const node = this.state.nodes[id];

        if (node) {
            const newNodes = {
                ...this.state.nodes,
                [id]: {
                    ...node,
                    cx: node.cx + dx,
                    cy: node.cy + dy,
                },
            };

            this.setState({ nodes: newNodes });
        }
    };

    setDepth = (depth) => {
        const { color, selected } = this.state;
        const nodes = makeTree(depth, NODE_SIZE, color);

        this.setState({ selected: nodes[selected] ? nodes[selected].label : null, depth, nodes });
    };

    setColor = (color) => {
        const { selected, nodes } = this.state;
        if (selected !== null) {
            const node = nodes[selected];

            if (node) {
                this.setState({ color });
                this.animate(color, node.label);
            }
        }
    };

    animate = (color, id) => {
        const node = this.state.nodes[id];

        if (node) {
            const newNodes = {
                ...this.state.nodes,
                [id]: {
                    ...node,
                    color,
                },
            };

            this.setState({ nodes: newNodes }, () => {
                const parent = this.state.nodes[node.parent];
                const left = this.state.nodes[node.left];
                const right = this.state.nodes[node.right];

                if (parent && parent.color !== color) {
                    setTimeout(() => this.animate(color, parent.label), animationInterval());
                }

                if (left && left.color !== color) {
                    setTimeout(() => this.animate(color, left.label), animationInterval());
                }

                if (right && right.color !== color) {
                    setTimeout(() => this.animate(color, right.label), animationInterval());
                }
            });
        }
    };
}

const animationInterval = () => {
    const min = 800;
    const max = 1200;

    const result = min + Math.random() * (max + 1 - min);
    return Math.floor(result);
};

export default App;
