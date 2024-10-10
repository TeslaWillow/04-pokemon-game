<template>
    <div class="flex flex-col">
        <button 
            v-for="{ id, name } in options"
            :key="id"
            @click="$emit('selectedOption', id)"
            class="capitalize"
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
</style>