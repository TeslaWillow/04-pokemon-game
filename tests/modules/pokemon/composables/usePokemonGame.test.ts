import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { usePokemonGame } from '@pokemon/composables/usePokemonGame';
import { pokemonApi } from '@pokemon/API/pokemonApi';
import { GameStatus } from '@pokemon/interfaces/game-status.enum';
import { withSetup } from '../../../../tests/utils/with-setup';
import { pokemonListFake } from '../../../../tests/data/fake-pokemon';

const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

describe('usePokemonGame', () => {
  test('should initialize w/ the correct default values', async () => {
    const [result, app] = withSetup(usePokemonGame);
    expect(result.gameStatus.value).toBe(GameStatus.Playing);
    expect(result.isLoading.value).toBeTruthy();
    expect(result.pokemonsOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBe(undefined);

    await flushPromises(); // Wait all promises

    expect(result.isLoading.value).toBeFalsy();
    expect(result.pokemonsOptions.value.length).toBe(4);
    expect(result.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('Should correctly handle getNextRound', async () => {
    const [result, app] = withSetup(usePokemonGame);

    await flushPromises();

    result.gameStatus.value = GameStatus.Won;

    // Estímulo
    result.getNextRound(5);

    expect(result.gameStatus.value).toBe(GameStatus.Playing);
    expect(result.pokemonsOptions.value).toHaveLength(5);
  });

  test('Should correctly habdle getNextRound and return diferent pokemons', async () => {
    const [result, app] = withSetup(usePokemonGame);

    await flushPromises();

    result.gameStatus.value = GameStatus.Won;

    const originalOptions = [...result.pokemonsOptions.value];
    const originalOptionsNames = new Set(originalOptions.map((p) => p.name));

    // Estímulo
    result.getNextRound();

    const nextOptions = [...result.pokemonsOptions.value];
    const nextOptionsNames = nextOptions.map((p) => p.name);

    const hasntDuplicates = !nextOptionsNames.some((p) => originalOptionsNames.has(p));

    expect(nextOptions).toHaveLength(4);
    expect(originalOptions).toHaveLength(4);
    expect(result.gameStatus.value).toBe(GameStatus.Playing);
    expect(nextOptions).not.toEqual(originalOptions);
    expect(hasntDuplicates).toBeTruthy();
  });
});
