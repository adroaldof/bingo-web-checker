import { v4 as uuidV4 } from 'uuid'

export type Piece = {
  uuid: string
  number: number
  isDrawn: boolean
}

export type PieceInput = {
  uuid?: string
  number: number
  isDrawn?: boolean
}

export class PieceEntity {
  uuid: string
  number: number
  isDrawn: boolean

  constructor({ uuid, number, isDrawn = false }: PieceInput) {
    if (number < 0) throw new Error('Number must be greater than 0')
    if (number > 100) throw new Error('Number must be lower than 100')
    this.uuid = uuid || uuidV4()
    this.number = number
    this.isDrawn = isDrawn
  }

  setAsDrawn() {
    this.isDrawn = true
  }

  unsetDrawn() {
    this.isDrawn = false
  }

  getIsDraw() {
    return this.isDrawn
  }

  toJson(): Piece {
    return {
      uuid: this.uuid,
      number: this.number,
      isDrawn: this.isDrawn,
    }
  }
}
