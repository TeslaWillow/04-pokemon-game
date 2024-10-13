import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('GameStatus enum', () => {
  const pokemon: Pokemon = { id: 1, name: 'bulbasur' };

  test('Should have a id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });
  test('Should have a id property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
