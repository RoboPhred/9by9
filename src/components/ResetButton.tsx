import * as React from "react";
import { useDispatch } from "react-redux";

import { reset } from "@/services/game/actions/reset";

const ResetButton: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return <button onClick={onClick}>Reset</button>;
};

export default ResetButton;
