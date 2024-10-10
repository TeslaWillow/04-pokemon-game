<template>
    <div class="flex flex-col">
        <button 
            v-for="{ id, name } in options"
            :key="id"
            :disabled="blockSelection"
            :class="['option', {
                correct:   blockSelection && id === correctAnswer.id,
                incorrect: blockSelection && id !== correctAnswer.id,
            }]"
            @click="$emit('selectedOption', id)"
        >
            {{ name }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

// Inputs
interface Props {
    options: Pokemon[];
    correctAnswer: Pokemon;
    blockSelection: boolean;
}
defineProps<Props>();

// Outputs
defineEmits<{
    selectedOption: [id: number];
}>();

</script>

<style lang="css" scoped>
button {
    @apply bg-white shadow-md rounded-lg p-3 mb-5 cursor-pointer w-80 text-center transition-all hover:bg-gray-100;
}
.option {
    @apply capitalize disabled:shadow-none disabled:cursor-not-allowed disabled:pointer-events-none;
}
.correct {
    @apply bg-green-700 text-white;
}
.incorrect {
    @apply bg-red-100 opacity-70;
}
</style>