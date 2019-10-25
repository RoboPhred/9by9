import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "@/state";
import { placeToken } from "@/services/actions/placeToken";

import Token from "./Token";

const PositionedToken: React.FC<{ position: number }> = ({ position }) => {
  const dispatcher = useDispatch();
  const tokenState = useSelector(
    (state: AppState) => state.services.game.tokens[position]
  );
  const onClick = React.useCallback(
    (e: React.MouseEvent<any>) => {
      dispatcher(placeToken(position));
    },
    [position]
  );

  return <Token tokenType={tokenState} onClick={onClick} />;
};

export default PositionedToken;
