<template>
    <section v-if="isLoading || randomPokemon.id == null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemons...</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        
        <div class="h-20">
            <button
                v-if="gameStatus !== GameStatus.Playing"
                @click="getNextRound()"
                class="bg-white shadow-md rounded-lg p-3 mb-5 cursor-pointer w-80 text-center transition-all hover:bg-blue-500 hover:text-white"
            >
                Volver a jugar
            </button>
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
    getNextRound,
} = usePokemonGame();

const onSelectedOptions = ( value: number ) => {
    checkAnswer(value);
};

</script>
