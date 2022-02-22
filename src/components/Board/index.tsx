import { useEffect, useState } from "react";
import { BOARD } from "../../enums";
import Square from "../Square";

import "./index.scss";

interface INode extends Array<number> {}

function Board() {
  const origin = 0;
  const target = 11;
  const [graph, setGraph] = useState<INode[]>([]);
  const [blocked, setBlocked] = useState<number[]>([]);
  const [lineDirection, setLineDirection] = useState<any>(null);

  useEffect(() => {
    const graph = addAdjacentNodes();
    setGraph(graph);
  }, []);

  useEffect(() => {
    const visitedNodes: number[] = [...blocked];
    const paths: any = new Map();
    paths.set(0, [0]);

    let currentNode: number = origin;
    if (graph.length > 0) {
      while (true) {
        let neighborNodes = graph[currentNode];
        for (let neighborNode of neighborNodes) {
          if (paths.get(neighborNode) === undefined) {
            const previousPath = paths.get(currentNode);
            paths.set(neighborNode, [...previousPath, neighborNode]);
          }
        }
        visitedNodes.push(currentNode);

        let unvisitedPaths = new Map(paths);

        visitedNodes.forEach((node: any) => {
          unvisitedPaths.delete(node);
        });

        let sortedUnvisitedPaths = new Map(
          [...unvisitedPaths].sort((a: any, b: any) => {
            return a[1].length - b[1].length;
          })
        );

        if (sortedUnvisitedPaths.entries().next().value === undefined) break;
        currentNode = sortedUnvisitedPaths.entries().next().value[0];
      }
    }
    setLineDirection(paths.get(target));
  }, [graph, blocked]);

  const addAdjacentNodes = () => {
    return Array(BOARD.NODES_COUNT)
      .fill([])
      .map((node: any, index: number) => {
        const adjacentArray = [];
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
          adjacentArray.push(rightNode);
        }
        if (!atLeftSide) {
          adjacentArray.push(leftNode);
        }
        if (!atBottom) {
          adjacentArray.push(bottomNode);
        }
        if (!atTop) {
          adjacentArray.push(upperNode);
        }
        if (!atLeftSide && !atTop) {
          adjacentArray.push(upperLeftNode);
        }
        if (!atTop && !atRight) {
          adjacentArray.push(upperRightNode);
        }
        if (!atLeftSide && !atBottom) {
          adjacentArray.push(bottomLeftNode);
        }
        if (!atRight && !atBottom) {
          adjacentArray.push(bottomRightNode);
        }
        return adjacentArray;
      });
  };

  const handleToggleBlock = (nodeIndex: number) => {
    if (!blocked.includes(nodeIndex)) {
      setBlocked(prevState => [...prevState, nodeIndex]);
    } else {
      setBlocked(prevState => [
        ...prevState.filter(item => item !== nodeIndex),
      ]);
    }
  };

  return (
    <div className="board">
      {graph.map((_node: any, index: number) => {
        let nextNode = null;
        if (lineDirection?.includes(index)) {
          const tempIndex = lineDirection.indexOf(index);
          if (lineDirection[tempIndex + 1] !== undefined) {
            nextNode = lineDirection[tempIndex + 1];
          }
        }

        return (
          <Square
            currentSquare={index}
            key={index}
            nextNode={nextNode}
            blocked={blocked.includes(index)}
            onClick={handleToggleBlock}
          />
        );
      })}
    </div>
  );
}

export default Board;
