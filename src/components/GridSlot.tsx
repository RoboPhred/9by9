import * as React from "react";

import { useObservation } from "@/hooks/observe";

import { GameGridSlot } from "@/services/game/GameGridSlot";

import TokenVisual from "./Token";

export interface InteractiveTokenProps {
  slot: GameGridSlot;
}
const GridSlot = ({ slot }: InteractiveTokenProps) => {
  const token = useObservation(slot.token$) ?? null;
  const isWinning = useObservation(slot.isWinningToken$) ?? false;

  const onClick = React.useCallback(() => {
    slot.onClick();
  }, [slot]);

  return (
    <TokenVisual isWinningToken={isWinning} token={token} onClick={onClick} />
  );
};

export default GridSlot;
