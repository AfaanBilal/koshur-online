<template>
    <div class="relative" ref="container">
        <button
            class="flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium transition-all border rounded-lg shadow-sm bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            @click="isOpen = !isOpen" @keydown.enter.prevent="isOpen = !isOpen"
            @keydown.space.prevent="isOpen = !isOpen" @keydown.arrow-down.prevent="isOpen = true"
            aria-haspopup="listbox" :aria-expanded="isOpen">
            <span class="truncate">{{ modelValue }}</span>
            <svg class="w-4 h-4 ml-2 transition-transform duration-200 text-slate-500" :class="{ 'rotate-180': isOpen }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <ul v-if="isOpen"
                class="absolute left-0 right-0 z-50 mt-1 overflow-auto text-sm border rounded-lg shadow-xl max-h-60 bg-slate-900 border-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none custom-scrollbar"
                role="listbox" tabindex="-1">
                <li v-for="option in options" :key="option"
                    class="relative py-2 pl-3 text-slate-300 select-none pr-9 hover:bg-slate-800 cursor-pointer"
                    :class="{ 'bg-slate-800 text-white': modelValue === option }" @click="select(option)" role="option"
                    :aria-selected="modelValue === option">
                    <span class="block truncate" :class="{ 'font-semibold': modelValue === option }">
                        {{ option }}
                    </span>
                    <span v-if="modelValue === option"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500">
                        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    modelValue: string;
    options: string[];
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const select = (option: string) => {
    emit('update:modelValue', option);
    emit('change', option);
    isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (container.value && !container.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
