<template>
    <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemons...</h3>
    </section>

    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl mb-5">¿Quién es este pokemon?</h1>

        <!-- POKEMON PICTURE  -->
        <PokemonPicture /> 
        
        <!-- POKEMON OPTIONS  -->
        <PokemonOptions />

    </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';


</script>
