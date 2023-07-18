import { Piece } from '../piece/Piece'
import { v4 as uuidV4 } from 'uuid'

const DEFAULT_ROW_AND_COLUMN = 5

type Spot = Piece | null

export type CardInput = {
  uuid?: string
  rows?: number
  columns?: number
  cardNumbers?: number[]
}

export class Card {
  uuid: string
  rows: number
  columns: number
  spots: Spot[][] = []

  constructor({
    uuid = uuidV4(),
    rows = DEFAULT_ROW_AND_COLUMN,
    columns = DEFAULT_ROW_AND_COLUMN,
    cardNumbers,
  }: CardInput = {}) {
    this.uuid = uuid
    this.rows = rows
    this.columns = columns
    this.spots = this.setSpots(cardNumbers)
  }

  setSpots(cardNumbers?: number[]): Spot[][] {
    if (!cardNumbers) {
      return Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => null))
    }
    let currentPosition = 0
    const spots = []
    while (currentPosition < cardNumbers.length) {
      const rowNumbers = cardNumbers.slice(currentPosition, currentPosition + this.columns)
      const row = rowNumbers.map((number) => new Piece({ number }))
      spots.push(row)
      currentPosition += this.columns
    }
    return spots
  }

  setPiece(row: number, column: number, number: number) {
    if (row < 0 || row > this.rows) throw new Error('Row does not exist')
    if (column < 0 || column > this.columns) throw new Error('Column does not exist')
    const piece = new Piece({ number })
    this.spots[row][column] = piece
  }

  draw(number: number) {
    this.spots.forEach((row) => {
      row.forEach((spot) => {
        if (spot?.toJson().number === number) spot.setAsDrawn()
      })
    })
  }

  hasSomeCompleteRows() {
    return this.spots.some((row) => row.every((spot) => spot?.getIsDraw()))
  }

  hasSomeCompleteColumns() {
    return Array.from({ length: this.columns }, (_, column) => {
      return this.spots.every((row) => row[column]?.getIsDraw())
    }).some((completeColumn) => completeColumn)
  }

  hasSomeCompleteDiagonals() {
    if (this.rows !== this.columns) return false
    const descendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][index]?.getIsDraw()
    }).every((completeDiagonal) => completeDiagonal)
    const ascendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][this.columns - 1 - index]?.getIsDraw()
    }).every((completeDiagonal) => completeDiagonal)
    return descendingDiagonal || ascendingDiagonal
  }

  hasCompletedTheCard() {
    return this.spots.every((row) => row.every((column) => column?.getIsDraw()))
  }

  getResults() {
    return {
      row: this.hasSomeCompleteRows(),
      column: this.hasSomeCompleteColumns(),
      diagonal: this.hasSomeCompleteDiagonals(),
      complete: this.hasCompletedTheCard(),
    }
  }

  toJson() {
    return {
      uuid: this.uuid,
      rows: this.rows,
      columns: this.columns,
      spots: this.spots,
      results: this.getResults(),
    }
  }
}
