<template>
    <section v-if="isLoading || randomPokemon.id == null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemons...</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <div class="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
            <span class="font-medium capitalize">{{ gameStatus }}</span>
        </div>

        <h1 class="text-3xl mb-5">¿Quién es este pokemon?</h1>

        <!-- POKEMON PICTURE  -->
        <PokemonPicture 
            :pokemon-id="randomPokemon.id" 
            :show-pokemon="gameStatus !== GameStatus.Playing"
        /> 
        
        <!-- POKEMON OPTIONS  -->
        <PokemonOptions 
            :options="options"
            :correct-answer="randomPokemon"
            :block-selection="gameStatus !== GameStatus.Playing"
            @selected-option="onSelectedOptions"
        />
        
    </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { 
    gameStatus, 
    isLoading, 
    randomPokemon,
    pokemonsOptions:options, // Renamed
    checkAnswer,
} = usePokemonGame();

const onSelectedOptions = ( value: number ) => {
    checkAnswer(value);
};

</script>
