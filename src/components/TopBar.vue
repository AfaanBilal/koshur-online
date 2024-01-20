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
    'Hello world!', 'Arithmetic', 'Control Flow', 'Functions', 'Test'
];

const chosen = ref(examples[0]);
</script>

<template>
    <div class="flex items-center p-1 px-5 bg-slate-950">
        <div class="px-2">
            <img src="/leaf.svg" class="w-5" />
        </div>
        <div class="text-lg text-slate-300">Koshur Online</div>
        <div class="flex items-center gap-2 px-2 ml-auto">
            <div class="px-2 border rounded border-slate-600">
                Example:
                <select v-model="chosen" class="p-1 m-1 rounded outline-none bg-slate-800"
                    @change="$emit('example', chosen)">
                    <option v-for="e in examples" :key="e">{{ e }}</option>
                </select>
            </div>
            <div class="px-2 py-1 bg-green-800 border rounded cursor-pointer select-none hover:bg-green-700 active:bg-green-600 border-green-950"
                @click="$emit('run')">Run
                &rtrif;
            </div>
            <div class="px-2 py-1 border rounded cursor-pointer select-none bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-slate-950"
                @click="$emit('clear')">Clear
                &Cross;
            </div>
        </div>
        <div class="flex gap-2 ml-auto text-sm">
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
