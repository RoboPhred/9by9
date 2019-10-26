import * as React from "react";

import theme from "@/theme/theme";
import { TokenType } from "@/services/game/types";

export interface TokenProps {
  tokenType: TokenType | "blank";
  isWinningToken: boolean;
  onClick?(e: React.MouseEvent<SVGGElement>): void;
}

interface TokenPartProps {
  color: string;
  onClick?(e: React.MouseEvent<SVGGElement>): void;
}

const size = theme.tokenSizePx;

const TokenX: React.FC<TokenPartProps> = ({ onClick, color }) => (
  <g strokeWidth={1} stroke={color} onClick={onClick}>
    <rect strokeWidth={0} fill="transparent" width={size} height={size} />
    <line x1={0} y1={0} x2={size} y2={size} />
    <line x1={size} y1={0} x2={0} y2={size} />
  </g>
);
const TokenO: React.FC<TokenPartProps> = ({ onClick, color }) => (
  <g strokeWidth={1} stroke={color} fill="none" onClick={onClick}>
    <rect strokeWidth={0} fill="transparent" width={size} height={size} />
    <circle cx={size / 2} cy={size / 2} r={size / 2} />
  </g>
);

const TokenBlank: React.FC<TokenPartProps> = ({ onClick }) => (
  <rect fill="transparent" width={size} height={size} onClick={onClick} />
);

const Token: React.FC<TokenProps> = ({
  tokenType,
  isWinningToken,
  onClick
}) => {
  const color = isWinningToken ? "gold" : "black";
  switch (tokenType) {
    case "x":
      return <TokenX color={color} onClick={onClick} />;
    case "o":
      return <TokenO color={color} onClick={onClick} />;
    case "blank":
      return <TokenBlank color="transparent" onClick={onClick} />;
    default:
      return <div>Error</div>;
  }
};

export default Token;
