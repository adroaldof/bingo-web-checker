import { Piece } from './Piece';

const DEFAULT_ROW_AND_COLUMN = 5;

export class Card {
  spots: Spot[][] = [];

  constructor(readonly rows: number = DEFAULT_ROW_AND_COLUMN, readonly columns: number = DEFAULT_ROW_AND_COLUMN) {
    this.spots = Array.from({ length: rows }, () => Array.from({ length: columns }, () => null));
  }

  setPiece(row: number, column: number, number: number) {
    if (row < 0 || row > this.rows) throw new Error('Row does not exist');
    if (column < 0 || column > this.columns) throw new Error('Column does not exist');
    const piece = new Piece(number);
    this.spots[row][column] = piece;
  }

  draw(number: number) {
    this.spots.forEach((row) => {
      row.forEach((spot) => {
        if (spot?.toJson().number === number) spot.setAsDrawn();
      });
    });
  }

  hasSomeCompleteRows() {
    return this.spots.some((row) => row.every((spot) => spot?.getIsDraw()));
  }

  hasSomeCompleteColumns() {
    return Array.from({ length: this.columns }, (_, column) => {
      return this.spots.every((row) => row[column]?.getIsDraw());
    }).some((completeColumn) => completeColumn);
  }

  hasSomeCompleteDiagonals() {
    if (this.rows !== this.columns) return false;
    const descendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][index]?.getIsDraw();
    }).every((completeDiagonal) => completeDiagonal);
    const ascendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][this.columns - 1 - index]?.getIsDraw();
    }).every((completeDiagonal) => completeDiagonal);
    return descendingDiagonal || ascendingDiagonal;
  }

  hasCompletedTheCard() {
    return this.spots.every((row) => row.every((column) => column?.getIsDraw()));
  }

  getResults() {
    return {
      row: this.hasSomeCompleteRows(),
      column: this.hasSomeCompleteColumns(),
      diagonal: this.hasSomeCompleteDiagonals(),
      complete: this.hasCompletedTheCard(),
    };
  }

  toJson() {
    return {
      rows: this.rows,
      columns: this.columns,
      spots: this.spots,
      results: this.getResults(),
    };
  }
}

type Spot = Piece | null;
