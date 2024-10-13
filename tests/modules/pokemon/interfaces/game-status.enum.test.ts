import { GameStatus } from '@pokemon/interfaces';

describe('GameStatus enum', () => {
  test('Should have a value of "Playing"', () => {
    expect(GameStatus.Playing).toBe('playing');
  });
  test('Should have a value of "Won"', () => {
    expect(GameStatus.Won).toBe('won');
  });
  test('Should have a value of "Lost"', () => {
    expect(GameStatus.Lost).toBe('lost');
  });
});
