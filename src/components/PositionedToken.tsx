import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "@/state";
import { placeToken } from "@/services/game/actions/placeToken";
import { winningPositions } from "@/services/game/selectors";

import Token from "./Token";

const PositionedToken: React.FC<{ position: number }> = ({ position }) => {
  const dispatcher = useDispatch();
  const tokenState = useSelector(
    (state: AppState) => state.services.game.tokens[position]
  );

  let isWinning = false;
  const winningPosition = useSelector(winningPositions);
  if (winningPosition && winningPosition.includes(position)) {
    isWinning = true;
  }

  const onClick = React.useCallback(() => {
    dispatcher(placeToken(position));
  }, [position]);

  return (
    <Token
      isWinningToken={isWinning}
      tokenType={tokenState}
      onClick={onClick}
    />
  );
};

export default PositionedToken;
