import { uniqBy } from "lodash";

import { getTokenIndexXY, getTokenIndexXYG } from "./utils";
import { TokenIndex, WinLine } from "./types";

// There is probably a more elegant way of finding the win lines...

function* iterateGridWinLines(gridPositions: TokenIndex[]): Iterable<WinLine> {
  // horiz
  for (let y = 0; y < 3; y++) {
    yield [
      gridPositions[getTokenIndexXY(0, y)],
      gridPositions[getTokenIndexXY(1, y)],
      gridPositions[getTokenIndexXY(2, y)],
    ];
  }

  // vert
  for (let x = 0; x < 3; x++) {
    yield [
      gridPositions[getTokenIndexXY(x, 0)],
      gridPositions[getTokenIndexXY(x, 1)],
      gridPositions[getTokenIndexXY(x, 2)],
    ];
  }

  // cross
  yield [
    gridPositions[getTokenIndexXY(0, 0)],
    gridPositions[getTokenIndexXY(1, 1)],
    gridPositions[getTokenIndexXY(2, 2)],
  ];
  yield [
    gridPositions[getTokenIndexXY(2, 0)],
    gridPositions[getTokenIndexXY(1, 1)],
    gridPositions[getTokenIndexXY(0, 2)],
  ];
}

function* iterateWinLines(): Iterable<WinLine> {
  // Grids
  for (let g = 0; g < 9; g++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, g),
      getTokenIndexXYG(1, 0, g),
      getTokenIndexXYG(2, 0, g),
      getTokenIndexXYG(0, 1, g),
      getTokenIndexXYG(1, 1, g),
      getTokenIndexXYG(2, 1, g),
      getTokenIndexXYG(0, 2, g),
      getTokenIndexXYG(1, 2, g),
      getTokenIndexXYG(2, 2, g),
    ]);
  }

  // Grid row slices
  for (let rowMajor = 0; rowMajor < 3; rowMajor++) {
    for (let rowMinor = 0; rowMinor < 3; rowMinor++) {
      yield* iterateGridWinLines([
        getTokenIndexXYG(0, rowMinor, rowMajor * 3),
        getTokenIndexXYG(1, rowMinor, rowMajor * 3),
        getTokenIndexXYG(2, rowMinor, rowMajor * 3),
        getTokenIndexXYG(0, rowMinor, rowMajor * 3 + 1),
        getTokenIndexXYG(1, rowMinor, rowMajor * 3 + 1),
        getTokenIndexXYG(2, rowMinor, rowMajor * 3 + 1),
        getTokenIndexXYG(0, rowMinor, rowMajor * 3 + 2),
        getTokenIndexXYG(1, rowMinor, rowMajor * 3 + 2),
        getTokenIndexXYG(2, rowMinor, rowMajor * 3 + 2),
      ]);
    }
  }

  // Grid row cross axis
  for (let rowMajor = 0; rowMajor < 3; rowMajor++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, rowMajor * 3),
      getTokenIndexXYG(0, 1, rowMajor * 3),
      getTokenIndexXYG(0, 2, rowMajor * 3),
      getTokenIndexXYG(1, 0, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 1, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 2, rowMajor * 3 + 1),
      getTokenIndexXYG(2, 0, rowMajor * 3 + 2),
      getTokenIndexXYG(2, 1, rowMajor * 3 + 2),
      getTokenIndexXYG(2, 2, rowMajor * 3 + 2),
    ]);
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, rowMajor * 3 + 2),
      getTokenIndexXYG(0, 1, rowMajor * 3 + 2),
      getTokenIndexXYG(0, 2, rowMajor * 3 + 2),
      getTokenIndexXYG(1, 0, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 1, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 2, rowMajor * 3 + 1),
      getTokenIndexXYG(2, 0, rowMajor * 3),
      getTokenIndexXYG(2, 1, rowMajor * 3),
      getTokenIndexXYG(2, 2, rowMajor * 3),
    ]);
  }

  // Grid column slices
  for (let columnMajor = 0; columnMajor < 3; columnMajor++) {
    for (let columnMinor = 0; columnMinor < 3; columnMinor++) {
      yield* iterateGridWinLines([
        getTokenIndexXYG(columnMinor, 0, columnMajor),
        getTokenIndexXYG(columnMinor, 1, columnMajor),
        getTokenIndexXYG(columnMinor, 2, columnMajor),
        getTokenIndexXYG(columnMinor, 0, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 1, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 2, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 0, columnMajor + 6),
        getTokenIndexXYG(columnMinor, 1, columnMajor + 6),
        getTokenIndexXYG(columnMinor, 2, columnMajor + 6),
      ]);
    }
  }

  // Grid column cross axis
  for (let columnMajor = 0; columnMajor < 3; columnMajor++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, columnMajor),
      getTokenIndexXYG(1, 0, columnMajor),
      getTokenIndexXYG(2, 0, columnMajor),
      getTokenIndexXYG(0, 1, columnMajor + 3),
      getTokenIndexXYG(1, 1, columnMajor + 3),
      getTokenIndexXYG(2, 1, columnMajor + 3),
      getTokenIndexXYG(0, 2, columnMajor + 6),
      getTokenIndexXYG(1, 2, columnMajor + 6),
      getTokenIndexXYG(2, 2, columnMajor + 6),
    ]);
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, columnMajor + 6),
      getTokenIndexXYG(1, 0, columnMajor + 6),
      getTokenIndexXYG(2, 0, columnMajor + 6),
      getTokenIndexXYG(0, 1, columnMajor + 3),
      getTokenIndexXYG(1, 1, columnMajor + 3),
      getTokenIndexXYG(2, 1, columnMajor + 3),
      getTokenIndexXYG(0, 2, columnMajor),
      getTokenIndexXYG(1, 2, columnMajor),
      getTokenIndexXYG(2, 2, columnMajor),
    ]);
  }

  // Crosses for second-level grid.
  yield [
    getTokenIndexXYG(0, 0, 0),
    getTokenIndexXYG(1, 1, 4),
    getTokenIndexXYG(2, 2, 8),
  ];
  yield [
    getTokenIndexXYG(2, 0, 2),
    getTokenIndexXYG(1, 1, 4),
    getTokenIndexXYG(0, 2, 6),
  ];
}

// Generating each combination of boards produces significant duplicates.
//  Clean up the dups to simplify the list
const winLinesComputed = Array.from(iterateWinLines());
const winLines = uniqBy(winLinesComputed, (x) => x.join("-"));

export default winLines;
