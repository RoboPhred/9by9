export type TokenType = "x" | "o";

export enum WinAxis {
  /**
   * Winning axis is a vertical line of x = 0
   */
  X0 = "x0",
  /**
   * Winning axis is a vertical line of x = 1
   */
  X1 = "x1",
  /**
   * Winning axis is a vertical line of x = 2
   */
  X2 = "x2",
  /**
   * Winning axis is a horizontal line of y = 0
   */
  Y0 = "y0",
  /**
   * Winning axis is a horizontal line of y = 1
   */
  Y1 = "y1",
  /**
   * Winning axis is a horizontal line of y = 2
   */
  Y2 = "y2",
  /**
   * Winning axis is a positive slope cross from lower left to upper right.
   */
  CrossPositive = "cp",
  /**
   * Winning axis is a negiative slope cross from upper left to lower right.
   */
  CrossNegative = "cn"
}
