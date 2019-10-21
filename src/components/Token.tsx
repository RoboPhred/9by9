import * as React from "react";

import theme from "@/theme/theme";

export interface TokenProps {
  tokenType: "x" | "o";
}

const size = theme.tokenSizePx;

const TokenX = (
  <g strokeWidth={1} stroke="black">
    <line x1={0} y1={0} x2={size} y2={size} />
    <line x1={size} y1={0} x2={0} y2={size} />
  </g>
);
const TokenO = (
  <g strokeWidth={1} stroke="black" fill="none">
    <circle cx={size / 2} cy={size / 2} r={size / 2} />
  </g>
);
const Token: React.FC<TokenProps> = ({ tokenType }) => {
  switch (tokenType) {
    case "x":
      return TokenX;
    case "o":
      return TokenO;
    default:
      return <div>Error</div>;
  }
};

export default Token;
