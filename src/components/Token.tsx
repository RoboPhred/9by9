import * as React from "react";

import theme from "@/theme/theme";

export interface TokenProps {
  tokenType: "x" | "o" | "blank";
  onClick?(e: React.MouseEvent<SVGGElement>): void;
}

interface TokenPartProps {
  onClick?(e: React.MouseEvent<SVGGElement>): void;
}

const size = theme.tokenSizePx;

const TokenX: React.FC<TokenPartProps> = ({ onClick }) => (
  <g strokeWidth={1} stroke="black" onClick={onClick}>
    <rect fill="transparent" width={size} height={size} />
    <line x1={0} y1={0} x2={size} y2={size} />
    <line x1={size} y1={0} x2={0} y2={size} />
  </g>
);
const TokenO: React.FC<TokenPartProps> = ({ onClick }) => (
  <g strokeWidth={1} stroke="black" fill="none" onClick={onClick}>
    <rect fill="transparent" width={size} height={size} />
    <circle cx={size / 2} cy={size / 2} r={size / 2} />
  </g>
);

const TokenBlank: React.FC<TokenPartProps> = ({ onClick }) => (
  <rect fill="transparent" width={size} height={size} onClick={onClick} />
);

const Token: React.FC<TokenProps> = ({ tokenType, onClick }) => {
  switch (tokenType) {
    case "x":
      return <TokenX onClick={onClick} />;
    case "o":
      return <TokenO onClick={onClick} />;
    case "blank":
      return <TokenBlank onClick={onClick} />;
    default:
      return <div>Error</div>;
  }
};

export default Token;
