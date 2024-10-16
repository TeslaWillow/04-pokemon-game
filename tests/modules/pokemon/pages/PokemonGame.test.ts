import { mount } from '@vue/test-utils';

import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import type { Mock } from 'vitest';
import { GameStatus } from '@/modules/pokemon/interfaces';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemons = [
  {
    id: 1,
    name: 'bulbasaur',
  },
  {
    id: 2,
    name: 'ivysaur',
  },
  {
    id: 3,
    name: 'venusaur',
  },
  {
    id: 4,
    name: 'charmander',
  },
];

describe('<PokemonGame />', () => {
  test('Should initialize w/ default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      randomPokemon: undefined,
      pokemonsOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });
    const wrapper = mount(PokemonGame);
    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h3').text()).toBe('Cargando pokemons...');
  });

  test('Should render <PokemonPicture/> and <PokemonOptions/>', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      randomPokemon: pokemons[0],
      pokemonsOptions: pokemons,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });
    const wrapper = mount(PokemonGame);
    expect('h1').toBe('¿Quién es este pokemon?');
  });
});
