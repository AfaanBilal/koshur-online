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
import examples from '../utils/examples';
import SelectMenu from './SelectMenu.vue';

const exampleKeys = Object.keys(examples);

const chosen = ref(exampleKeys[0]);
</script>

<template>
    <nav
        class="sticky top-0 z-50 flex flex-wrap items-center p-2 border-b backdrop-blur-md bg-slate-950/80 border-slate-800">
        <div class="flex items-center gap-3 mr-auto">
            <img src="/leaf.svg" class="w-8 h-8 drop-shadow-lg" alt="Koshur Leaf" />
            <div class="flex flex-col leading-tight">
                <span class="text-xl font-bold tracking-tight text-slate-100">Koshur Online</span>
                <a href="https://github.com/AfaanBilal/koshur-lang?tab=readme-ov-file#-koshur-lang" target="_blank"
                    rel="noopener" class="text-xs font-medium transition-colors text-slate-400 hover:text-blue-400">
                    Documentation &rarr;
                </a>
            </div>
        </div>

        <div class="flex items-center w-full gap-3 mt-2 md:mt-0 md:w-auto">
            <div class="relative flex items-center flex-1 md:flex-initial w-full md:w-64">
                <span
                    class="absolute left-0 -ml-16 text-xs font-medium text-slate-500 pointer-events-none hidden md:block">Example</span>
                <SelectMenu v-model="chosen" :options="exampleKeys" @change="$emit('example', chosen)" class="w-full" />
            </div>

            <button
                class="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white transition-all bg-green-600 rounded-lg shadow-lg hover:bg-green-500 active:bg-green-700 active:scale-95 shadow-green-900/20 ring-1 ring-inset ring-green-500/10"
                @click="$emit('run')">
                <span>Run</span>
                <span class="text-lg leading-none">&rtrif;</span>
            </button>
        </div>

        <div class="hidden gap-4 ml-6 text-sm font-medium md:flex text-slate-400">
            <a href="https://github.com/AfaanBilal/koshur-online" target="_blank" rel="noopener"
                class="transition-colors hover:text-white">
                GitHub
            </a>
            <span class="text-slate-700">|</span>
            <a href="https://afaan.dev" target="_blank" rel="noopener" class="transition-colors hover:text-white">
                &copy; Afaan Bilal
            </a>
        </div>
    </nav>
</template>
