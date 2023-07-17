export class Piece {
  private isDrawn = false;

  constructor(public number: number) {
    if (number < 0) throw new Error('Number must be greater than 0');
    if (number > 100) throw new Error('Number must be lower than 100');
  }

  setAsDrawn() {
    this.isDrawn = true;
  }

  unsetDrawn() {
    this.isDrawn = false;
  }

  getIsDraw() {
    return this.isDrawn;
  }

  toJson() {
    return {
      number: this.number,
      isDrawn: this.isDrawn,
    };
  }
}
