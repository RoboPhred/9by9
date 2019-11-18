import * as React from "react";
import { useDispatch } from "react-redux";
import { startGame } from "@/services/game/actions/start-game";

const ModeSelect: React.FC = () => {
  const dispatch = useDispatch();
  const onLocal = React.useCallback(() => {
    dispatch(startGame("local"));
  }, [dispatch]);
  const onAI = React.useCallback(() => {
    dispatch(startGame("ai"));
  }, [dispatch]);
  return (
    <div>
      <button onClick={onLocal}>Local 2 player</button>
      <button onClick={onAI}>VS AI</button>
    </div>
  );
};

export default ModeSelect;
