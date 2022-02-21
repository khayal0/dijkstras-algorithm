// import { useMemo, useState } from "react";
import { BOARD } from "../../enums";
import Square from "../Square";

import "./index.scss";

function Board() {
  // const initialPaths = useMemo(() => new Array(15).fill(null), []);
  // const [paths, setPaths] = useState([0, ...initialPaths]);

  const nodes: any = [
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
  ];

  const paths: any = { 0: { pathFrom: null, weight: 0 } };

  const visitedNodes: any = [];

  const addNeighbors = () => {
    nodes.forEach((node: any, index: number) => {
      const rightNode = index + 1;
      const leftNode = index - 1;
      const bottomNode = index + BOARD.WITH;
      const upperNode = index - BOARD.WITH;

      if (rightNode % BOARD.WITH !== 0) {
        node.neighbors.push(rightNode);
      }
      if (index % BOARD.WITH !== 0) {
        node.neighbors.push(leftNode);
      }
      if (bottomNode < 12) {
        node.neighbors.push(bottomNode);
      }
      if (index >= BOARD.WITH) {
        node.neighbors.push(upperNode);
      }
    });
  };

  addNeighbors();

  nodes.forEach((node: any, currentNodeIndex: any) => {
    if (visitedNodes.indexOf(currentNodeIndex) > -1) {
      return;
    }
    visitedNodes.push(currentNodeIndex);

    node.neighbors.forEach((neighbor: any) => {
      // console.log(paths[neighbor]);
      if (paths[neighbor] === undefined) {
        //TODO: if defined but less than
        // 1 {weight:1, path : currentIndex}
        paths[neighbor] = { weight: 1, path: currentNodeIndex };
      }
    });
  });

  console.log("== ALL NODES ==>", nodes);
  console.log("== ALL PATHS ==>", paths);
  console.log("== VISITED NODES ==>", visitedNodes);

  return (
    <div className="board">
      {nodes.map((_node: any, index: any) => (
        <Square index={index} key={index} />
      ))}
    </div>
  );
}

export default Board;
