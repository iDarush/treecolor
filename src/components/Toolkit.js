import { useCallback } from "react";

export const DEFAULT_COLOR = "#1E90FF";
const COLORS = ["#9370D8", DEFAULT_COLOR, "#DAA520", "#FFC0CB", "#90EE90"];

export const Toolkit = ({ depth, color, onDepthChanged, onColorChanged }) => {
    const increment = useCallback(() => {
        onDepthChanged(depth + 1);
    }, [onDepthChanged, depth]);

    const decrement = useCallback(() => {
        onDepthChanged(depth - 1);
    }, [onDepthChanged, depth]);

    return (
        <div className="toolkit">
            <label htmlFor="depth">Глубина</label>
            <div>
                <button disabled={depth === 1} onClick={decrement}>
                    -
                </button>
                <input name="depth" type="number" min={1} max={20} value={depth} readOnly />
                <button disabled={depth === 20} onClick={increment}>
                    +
                </button>
            </div>

            <label htmlFor="color">Цвет</label>
            <div name="color">
                {COLORS.map((c) => (
                    <div
                        key={c}
                        style={{ backgroundColor: c }}
                        className={`toolkit_color ${color === c ? "toolkit_color-selected" : ""}`}
                        onClick={() => onColorChanged(c)}
                    />
                ))}
            </div>
        </div>
    );
};
