import * as React from "react";

import theme from "@/theme/theme";

const childOffset = (theme.squareSizePx - theme.tokenSizePx) / 2;

export interface GridProps {
  x: number;
  y: number;
}

const GridVisual: React.FC<GridProps> = ({ x, y, children }) => {
  const lineChildren: React.ReactNode[] = [];
  for (let i = 1; i <= 2; i++) {
    lineChildren.push(
      <line
        key={`x${i}`}
        x1={0}
        y1={theme.squareSizePx * i}
        x2={theme.squareSizePx * 3}
        y2={theme.squareSizePx * i}
      />
    );
    lineChildren.push(
      <line
        key={`y${i}`}
        y1={0}
        x1={theme.squareSizePx * i}
        y2={theme.squareSizePx * 3}
        x2={theme.squareSizePx * i}
      />
    );
  }

  const arrayChildren = React.Children.toArray(children);
  const contentChildren: React.ReactNode[] = [];
  for (let i = 0; i < arrayChildren.length; i++) {
    const x = i % 3;
    const y = Math.floor(i / 3);
    contentChildren.push(
      <g
        transform={`translate(${theme.squareSizePx * x +
          childOffset}, ${theme.squareSizePx * y + childOffset})`}
        key={`ch${i}`}
      >
        {arrayChildren[i]}
      </g>
    );
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g strokeWidth={1} stroke="black">
        {lineChildren}
      </g>
      {contentChildren}
    </g>
  );
};

export default GridVisual;
