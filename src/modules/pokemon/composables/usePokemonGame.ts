import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../API/pokemonApi';

import confetti from 'canvas-confetti';

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

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany); // 0 a 4 y retorna sin alterar el arreglo
    pokemons.value = pokemons.value.slice(howMany); // 4 para arrina
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.Lost;
  };

  // Al ser creado - onInit
  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    // METHOD
    getNextRound,
    checkAnswer,
  };
};
