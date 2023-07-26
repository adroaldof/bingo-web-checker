import { PieceEntity, PieceInput, Piece } from '../piece/Piece'
import { v4 as uuidV4 } from 'uuid'

const DEFAULT_ROW_AND_COLUMN = 5

export type Spot = PieceEntity | null
export type SpotOutput = Piece | undefined

export type Card = {
  uuid: string
  id: string
  rows: number
  columns: number
  spots: SpotOutput[][]
  results: CardStatusOutput
}

export type CardInput = {
  uuid?: string
  id?: string
  rows?: number
  columns?: number
  spots?: SpotOutput[][]
  cardNumbers?: number[]
}

export type CardStatusOutput = {
  uuid: string
  id: string
  row: boolean
  column: boolean
  diagonal: boolean
  complete: boolean
  checkedCount: number
}
export class CardEntity {
  uuid: string
  id: string
  rows: number
  columns: number
  spots: Spot[][] = []

  constructor({
    uuid = uuidV4(),
    id = uuidV4(),
    rows = DEFAULT_ROW_AND_COLUMN,
    columns = DEFAULT_ROW_AND_COLUMN,
    spots = [],
    cardNumbers,
  }: CardInput = {}) {
    this.uuid = uuid
    this.id = id
    this.rows = rows
    this.columns = columns
    this.spots = spots.length ? this.hydrateSpots(spots) : this.setSpots(cardNumbers)
  }

  setSpots(cardNumbers?: number[]): Spot[][] {
    if (!cardNumbers) {
      return Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => null))
    }
    let currentPosition = 0
    const spots = []
    while (currentPosition < cardNumbers.length) {
      const rowNumbers = cardNumbers.slice(currentPosition, currentPosition + this.columns)
      const row = rowNumbers.map((number) => new PieceEntity({ number }))
      spots.push(row)
      currentPosition += this.columns
    }
    return spots
  }

  hydrateSpots(spotsOutput: SpotOutput[][]): Spot[][] {
    return spotsOutput.map((row) => row.map((spot) => new PieceEntity(spot as PieceInput)))
  }

  setPiece(row: number, column: number, number: number) {
    if (row < 0 || row > this.rows) throw new Error('Row does not exist')
    if (column < 0 || column > this.columns) throw new Error('Column does not exist')
    const piece = new PieceEntity({ number })
    this.spots[row][column] = piece
  }

  draw(number: number) {
    this.spots.forEach((row) => {
      row.forEach((spot) => {
        if (spot?.toJson().number === number) spot.setAsDrawn()
      })
    })
  }

  hasSomeCompleteRows(): boolean {
    return this.spots.some((row) => row.every((spot) => spot?.getIsDraw()))
  }

  hasSomeCompleteColumns(): boolean {
    return Array.from({ length: this.columns }, (_, column) => {
      return this.spots.every((row) => row[column]?.getIsDraw())
    }).some((completeColumn) => completeColumn)
  }

  hasSomeCompleteDiagonals(): boolean {
    if (this.rows !== this.columns || !this.spots.length) return false
    const descendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][index]?.getIsDraw()
    }).every((completeDiagonal) => completeDiagonal)
    const ascendingDiagonal = Array.from({ length: this.columns }, (_, index) => {
      return this.spots[index][this.columns - 1 - index]?.getIsDraw()
    }).every((completeDiagonal) => completeDiagonal)
    return descendingDiagonal || ascendingDiagonal
  }

  hasCompletedTheCard(): boolean {
    return this.spots.every((row) => row.every((column) => column?.getIsDraw()))
  }

  getCountOfCheckedSpots(): number {
    return this.spots.reduce((checkedCount, row) => {
      return checkedCount + row.filter((spot) => spot?.isDrawn).length
    }, 0)
  }

  getResults(): CardStatusOutput {
    return {
      uuid: this.uuid,
      id: this.id,
      row: this.hasSomeCompleteRows(),
      column: this.hasSomeCompleteColumns(),
      diagonal: this.hasSomeCompleteDiagonals(),
      complete: this.hasCompletedTheCard(),
      checkedCount: this.getCountOfCheckedSpots(),
    }
  }

  toJson(): Card {
    return {
      uuid: this.uuid,
      id: this.id,
      rows: this.rows,
      columns: this.columns,
      spots: this.spots.length ? this.spots.map((row) => row.map((piece) => piece?.toJson())) : [],
      results: this.getResults(),
    }
  }
}
