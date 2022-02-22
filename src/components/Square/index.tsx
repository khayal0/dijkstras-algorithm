import { useEffect, useState } from "react";
import { BOARD } from "../../enums";

import "./index.scss";

function Square({ index, shortestPathArray }: any) {
  const [lineDirection, setLineDirection] = useState<any>(null);

  useEffect(() => {
    if (shortestPathArray.indexOf(index) > -1) {
      const currentNode = index;
      const currentNodeIdx = shortestPathArray.indexOf(currentNode);
      const nextNode = shortestPathArray[currentNodeIdx + 1];
      console.log("current node", currentNode, "index", nextNode);
      if (nextNode !== undefined) {
        setLineDirection([currentNode, nextNode]);
      }
    }
  }, [index, shortestPathArray]);

  const directions = {
    up: { x: "50%", y: "0" },
    down: { x: "50%", y: "100%" },
    right: { x: "100%", y: "50%" },
    left: { x: "0", y: "50%" },
    topLeft: { x: "0", y: "0" },
    topRight: { x: "100%", y: "0" },
    bottomLeft: { x: "0", y: "100%" },
    bottomRight: { x: "100%", y: "100%" },
  };

  const getLinePosition = (): any => {
    const [currentSquare, targetSquare] = lineDirection;

    return {
      "1": directions.left,
      "-1": directions.right,
      [BOARD.WITH]: directions.up,
      [-BOARD.WITH]: directions.down,
      [BOARD.WITH + 1]: directions.topLeft,
      [BOARD.WITH - 1]: directions.topRight,
      [-BOARD.WITH + 1]: directions.bottomLeft,
      [-BOARD.WITH - 1]: directions.bottomRight,
    }[currentSquare - targetSquare];
  };

  return (
    <div className="square">
      <span>{index}</span>
      {lineDirection !== null && (
        <svg className="square__line-svg">
          <line
            x1="50%"
            y1="50%"
            x2={getLinePosition()["x"]}
            y2={getLinePosition()["y"]}
          />
        </svg>
      )}
    </div>
  );
}

export default Square;
