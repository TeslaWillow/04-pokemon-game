import { pokemonApi } from '@/modules/pokemon/API/pokemonApi';

describe('pokemonApi', () => {
  test('Should be configured as expected', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
  });
});
