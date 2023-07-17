import { expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { Piece } from './piece';

it('throws when a number is lower than 0', () => {
  expect(() => new Piece(-1)).toThrow('Number must be greater than 0');
});

it('throws when a number is greater than 100', () => {
  expect(() => new Piece(101)).toThrow('Number must be lower than 100');
});

it('contains a number and is drawn properties', () => {
  const currentNumber = faker.number.int({ min: 0, max: 100 });
  const piece = new Piece(currentNumber);
  const output = piece.toJson();
  expect(output).toEqual(
    expect.objectContaining({
      number: expect.any(Number),
      isDrawn: expect.any(Boolean),
    })
  );
});

it('sets the number as drawn', () => {
  const currentNumber = faker.number.int({ min: 0, max: 100 });
  const piece = new Piece(currentNumber);
  piece.setAsDrawn();
  const output = piece.toJson();
  expect(output.number).toBe(currentNumber);
  expect(output.isDrawn).toBe(true);
});

it('unset a drawn number', () => {
  const currentNumber = faker.number.int({ min: 0, max: 100 });
  const piece = new Piece(currentNumber);
  piece.setAsDrawn();
  piece.unsetDrawn();
  const output = piece.toJson();
  expect(output.number).toBe(currentNumber);
  expect(output.isDrawn).toBe(false);
});
