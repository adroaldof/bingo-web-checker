import { beforeEach, expect, it } from 'vitest';
import { Card } from './card';
import { faker } from '@faker-js/faker';
import { Piece } from './piece';

let piece: number;
const defaultIndexes = [0, 1, 2, 3, 4];

beforeEach(() => {
  piece = faker.number.int({ min: 0, max: 100 });
});

it('sets a card with 5 rows and 5 columns', () => {
  const card = new Card();
  expect(card.rows).toBe(5);
  expect(card.columns).toBe(5);
});

it('a card have rows, columns and pieces', () => {
  const card = new Card();
  const output = card.toJson();
  expect(output).toEqual(
    expect.objectContaining({
      rows: expect.any(Number),
      columns: expect.any(Number),
      spots: expect.any(Array),
    })
  );
});

it('each spot should be null when not set', () => {
  const card = new Card();
  const output = card.toJson();
  const { spots } = output;
  const [spot] = spots;
  expect(spot[0]).toBeNull();
});

it('throws when trying to add a piece to a non existing row', () => {
  const card = new Card();
  expect(() => card.setPiece(6, 1, piece)).toThrow('Row does not exist');
});

it('throws when trying to add a piece to a non existing column', () => {
  const card = new Card();
  expect(() => card.setPiece(1, 6, piece)).toThrow('Column does not exist');
});

it('throws when try to add a number greater than 100', () => {
  const card = new Card();
  const piece = faker.number.int({ min: 101, max: 200 });
  expect(() => card.setPiece(1, 1, piece)).toThrow('Number must be lower than 100');
});

it('sets a piece to the second row third column', () => {
  const card = new Card();
  const row = 1;
  const column = 2;
  card.setPiece(row, column, piece);
  const output = card.toJson();
  const currentPiece = output.spots[row][column];
  expect(currentPiece).toBeInstanceOf(Piece);
  expect(currentPiece?.toJson().number).toBe(piece);
  expect(currentPiece?.toJson().isDrawn).toBe(false);
});

it('draws a piece', () => {
  const card = new Card();
  const rowAndColumn = 2;
  card.setPiece(rowAndColumn, rowAndColumn, piece);
  card.draw(piece);
  const output = card.toJson();
  const currentPiece = output.spots[rowAndColumn][rowAndColumn];
  expect(currentPiece).toBeInstanceOf(Piece);
  const values = currentPiece?.toJson();
  expect(values?.number).toBe(piece);
  expect(values?.isDrawn).toBe(true);
});

it('returns winning on complete row', () => {
  const card = new Card();
  const row = 1;
  defaultIndexes.forEach((column) => {
    const piece = faker.number.int({ min: 0, max: 100 });
    card.setPiece(row, column, piece);
    card.draw(piece);
  });
  const output = card.toJson();
  expect(output.results.row).toBe(true);
});

it('returns winning on complete column', () => {
  const card = new Card();
  const column = 1;
  defaultIndexes.forEach((row) => {
    const piece = faker.number.int({ min: 0, max: 100 });
    card.setPiece(row, column, piece);
    card.draw(piece);
  });
  const output = card.toJson();
  expect(output.results.column).toBe(true);
});

it('returns winning on complete descending diagonals', () => {
  const card = new Card();
  defaultIndexes.forEach((index) => {
    const piece = faker.number.int({ min: 0, max: 100 });
    card.setPiece(index, index, piece);
    card.draw(piece);
  });
  const output = card.toJson();
  expect(output.results.diagonal).toBe(true);
});

it('returns winning on complete ascending diagonals', () => {
  const card = new Card();
  defaultIndexes.forEach((index) => {
    const piece = faker.number.int({ min: 0, max: 100 });
    card.setPiece(4 - index, index, piece);
    card.draw(piece);
  });
  const output = card.toJson();
  expect(output.results.diagonal).toBe(true);
});

it('returns winning on complete all numbers', () => {
  const card = new Card();
  defaultIndexes.forEach((row) => {
    defaultIndexes.forEach((column) => {
      const piece = faker.number.int({ min: 0, max: 100 });
      card.setPiece(row, column, piece);
      card.draw(piece);
    });
  });
  const output = card.toJson();
  expect(output.results.complete).toBe(true);
});

it('returns winning on complete custom card row and column', () => {
  const card = new Card(3, 5);
  [0, 1, 2].forEach((row) => {
    defaultIndexes.forEach((column) => {
      const piece = faker.number.int({ min: 0, max: 100 });
      card.setPiece(row, column, piece);
      card.draw(piece);
    });
  });
  const output = card.toJson();
  expect(output.results.complete).toBe(true);
});
