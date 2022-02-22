import { BOARD } from "../../enums";
import Square from "../Square";

import "./index.scss";

function Board() {
  const targetNode = 11;

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

  const paths: any = { 0: { path: null, weight: 0 } };

  const blockedNodes = [6, 2];
  const visitedNodes: number[] = [...blockedNodes];

  const addNeighbors = () => {
    nodes.forEach((node: any, index: number) => {
      const rightNode = index + 1;
      const leftNode = index - 1;
      const bottomNode = index + BOARD.WITH;
      const upperNode = index - BOARD.WITH;

      const upperRightNode = upperNode + 1;
      const upperLeftNode = upperNode - 1;
      const bottomRightNode = bottomNode + 1;
      const bottomLeftNode = bottomNode - 1;

      const atRight = (index + 1) % BOARD.WITH === 0;
      const atTop = index < BOARD.WITH;
      const atLeftSide = index % BOARD.WITH === 0;
      const atBottom = index + BOARD.WITH >= BOARD.NODES_COUNT;

      if (rightNode % BOARD.WITH !== 0) {
        node.neighbors.push(rightNode);
      }
      if (!atLeftSide) {
        node.neighbors.push(leftNode);
      }
      if (!atBottom) {
        node.neighbors.push(bottomNode);
      }
      if (!atTop) {
        node.neighbors.push(upperNode);
      }
      if (!atLeftSide && !atTop) {
        node.neighbors.push(upperLeftNode);
      }
      if (!atTop && !atRight) {
        node.neighbors.push(upperRightNode);
      }
      if (!atLeftSide && !atBottom) {
        node.neighbors.push(bottomLeftNode);
      }
      if (!atRight && !atBottom) {
        node.neighbors.push(bottomRightNode);
      }
    });
  };

  const calculateShortestPath = () => {
    nodes.forEach((node: any, currentNodeIndex: any) => {
      if (visitedNodes.indexOf(currentNodeIndex) > -1) {
        return;
      }
      visitedNodes.push(currentNodeIndex);

      node.neighbors.forEach((neighbor: any) => {
        if (paths[neighbor] === undefined) {
          paths[neighbor] = { weight: 1, path: currentNodeIndex };
        }
      });
    });
  };

  addNeighbors();
  calculateShortestPath();

  const shortestPathArray: any = [];
  let nextNode = paths[targetNode].path;

  let counter = 0;
  while (nextNode !== null && counter < 999) {
    shortestPathArray.unshift(nextNode);
    nextNode = paths[nextNode].path;
    console.log(nextNode);
    counter++;
  }

  if (nextNode === null) shortestPathArray.push(targetNode);

  return (
    <div className="board">
      {nodes.map((_node: any, index: any) => {
        let nextNode = null;
        if (shortestPathArray.indexOf(index) > -1) {
          const currentNode = index;
          const currentNodeIdx = shortestPathArray.indexOf(currentNode);
          const nextNodeTemp = shortestPathArray[currentNodeIdx + 1];
          console.log("current node", currentNode, "index", nextNode);
          if (nextNodeTemp !== undefined) {
            nextNode = nextNodeTemp;
          }
        }
        return (
          <Square
            index={index}
            key={index}
            nextNode={nextNode}
            blocked={blockedNodes.indexOf(index) > -1}
          />
        );
      })}
    </div>
  );
}

export default Board;
