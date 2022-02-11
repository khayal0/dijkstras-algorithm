import "./index.scss";

function Square() {
  const lineDirection = {
    x: 100,
    y: -50,
  };
  const getLinePosition = (n: number) => {
    return n + "%";
  };
  return (
    <div className="square">
      {lineDirection != null && (
        <svg className="square__line-svg">
          <line
            x1="50%"
            y1="50%"
            x2={getLinePosition(lineDirection.x)}
            y2={getLinePosition(-lineDirection.y)}
          />
        </svg>
      )}
    </div>
  );
}

export default Square;
