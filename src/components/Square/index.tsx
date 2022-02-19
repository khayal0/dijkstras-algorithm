import { BOARD } from "../../enums";

import "./index.scss";

function Square() {
  const lineDirection = { x: 100, y: 50 };

  const directions = {
    UP: { x: "50%", y: "0" },
    DOWN: { x: "50%", y: "100%" },
    RIGHT: { x: "100%", y: "50%" },
    LEFT: { x: "0%", y: "50%" },
  };

  const getLinePosition = (): any => {
    const sourceSquare = 1;
    const targetSquare = 2;
    return {
      "1": directions.LEFT,
      "-1": directions.RIGHT,
      [BOARD.WITH]: directions.UP,
      [-BOARD.WITH]: directions.DOWN,
    }[sourceSquare - targetSquare];
  };

  return (
    <div className="square">
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
