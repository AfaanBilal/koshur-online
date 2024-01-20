<script setup lang="ts">
/**
 * Koshur Online
 *
 * @link        https://koshur.afaan.dev
 *
 * @author      Afaan Bilal
 * @link        https://afaan.dev
 * @link        https://github.com/AfaanBilal/koshur-online
 * @license     MIT
 * @copyright   2024 Afaan Bilal
 */

import { ref } from 'vue';

const examples = [
    'Hello world!', 'Arithmetic', 'Control Flow', 'Functions', 'Fibonacci', 'Test'
];

const chosen = ref(examples[0]);
</script>

<template>
    <div class="flex flex-wrap items-center p-1 px-5 bg-slate-950">
        <div class="flex justify-center w-full gap-2 p-2 md:w-auto">
            <img src="/leaf.svg" class="w-10" />
            <div class="flex flex-col text-lg text-slate-300">
                Koshur Online
                <a href="https://github.com/AfaanBilal/koshur-lang?tab=readme-ov-file#-koshur-lang" target="_blank"
                    rel="noopener" class="text-xs hover:text-blue-400 text-slate-400">
                    &#8614; Documentation
                </a>
            </div>
        </div>
        <div
            class="flex items-center justify-between w-full gap-2 p-2 px-2 ml-auto border rounded border-slate-600 md:w-auto">
            Example:
            <select v-model="chosen" class="flex-1 p-1 m-1 rounded outline-none bg-slate-800"
                @change="$emit('example', chosen)">
                <option v-for="e in examples" :key="e">{{ e }}</option>
            </select>
            <div class="px-2 py-1 text-center bg-green-800 border rounded cursor-pointer select-none hover:bg-green-700 active:bg-green-600 border-green-950"
                @click="$emit('run')">
                Run &rtrif;
            </div>
        </div>
        <div class="flex justify-center w-full gap-2 p-1 ml-auto text-sm md:w-auto">
            <a href="https://github.com/AfaanBilal/koshur-online" target="_blank" rel="noopener"
                class="hover:text-blue-400">
                GitHub
            </a>
            |
            <a href="https://afaan.dev" target="_blank" rel="noopener" class="hover:text-blue-400">
                &copy; Afaan Bilal
            </a>
        </div>
    </div>
</template>
