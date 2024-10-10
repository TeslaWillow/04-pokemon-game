import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../API/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(
    () => pokemonsOptions.value[Math.round((pokemonsOptions.value.length - 1) * Math.random())],
  );

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonArray: Pokemon[] = response.data.results.map((p) => {
      const urlParts = p.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        id: +id,
        name: p.name,
      };
    });
    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany); // 0 a 4 y retorna sin alterar el arreglo
    pokemons.value = pokemons.value.slice(howMany); // 4 para arrina
  };

  // Al ser creado - onInit
  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    // METHOD
    getNextOptions,
  };
};
