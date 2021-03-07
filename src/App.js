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
            ...makeTree(initialDepth, NODE_SIZE, initialColor),
        };
    }

    render() {
        const { color, depth, selected, ...tree } = this.state;

        return (
            <div className="app">
                <Toolkit color={color} depth={depth} onColorChanged={this.setColor} onDepthChanged={this.setDepth} />

                <div className="tree-wrapper">
                    <Tree {...tree} selectedId={selected} onNodeSelected={this.selectNode} />
                </div>
            </div>
        );
    }

    selectNode = (id) => this.setState({ selected: id });

    setDepth = (depth) => {
        const { color } = this.state;
        const tree = makeTree(depth, NODE_SIZE, color);

        const restoredSelection =
            this.state.selected !== null ? tree.nodes.find((n) => n.label === this.state.selected) : null;

        this.setState({ selected: restoredSelection ? restoredSelection.label : null, depth, ...tree });
    };

    setColor = (color) => {
        const { selected, nodes } = this.state;
        if (selected !== null) {
            const node = nodes.find((n) => n.label === selected);

            if (node) {
                this.setState({ color });
                this.animate(color, node.label);
            }
        }
    };

    animate = (color, id) => {
        let node = null;
        const newNodes = this.state.nodes.map((n) => {
            return n.label !== id ? n : (node = { ...n, color });
        });

        if (node) {
            this.setState({ nodes: newNodes }, () => {
                const parent = node.parent ? this.state.nodes.find((n) => n.label === node.parent.label) : null;
                const left = node.left ? this.state.nodes.find((n) => n.label === node.left.label) : null;
                const right = node.right ? this.state.nodes.find((n) => n.label === node.right.label) : null;

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
