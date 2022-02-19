import { useMemo, useState } from "react";
import { BOARD } from "../../enums";
import Square from "../Square";

import "./index.scss";

function Board() {
  const initialPaths = useMemo(() => new Array(15).fill(null), []);
  const [paths, setPaths] = useState([0, ...initialPaths]);

  const nodes = [
    [0],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
    [Infinity],
  ];

  for (let [index, node] of paths.entries()) {
    // find out edges of a node
    // left
    if ((index + 1) % BOARD.WITH !== 0) {
      // has right edge
      console.log("HAS RIGHT");
    }
    if (index % BOARD.WITH !== 0) {
      // has left edge
      console.log("HAS LEFT");
    }
    if (BOARD.WITH + index < 12) {
      // has down edge
      console.log("HAS DOWN");
    }
    if (index >= BOARD.WITH) {
      // has upper egde
      console.log("HAS UPPER EDGE");
    }
    console.warn("NEXT FROM", index, index + 1);
  }

  return (
    <div className="board">
      {paths.map(path => (
        <Square />
      ))}
    </div>
  );
}

export default Board;
