import { onMounted, ref } from 'vue';
import { GameStatus, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../API/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    console.log(response.data);
  };

  // Al ser creado - onInit
  onMounted(() => {
    getPokemons();
  });

  return {
    gameStatus,
  };
};
