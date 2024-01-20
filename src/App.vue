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
import TopBar from './components/TopBar.vue';
import { runner } from './utils/runner.js';
import examples from './utils/examples';

const code = ref(examples['Hello world!']);

const setExample = (e: keyof typeof examples) => {
    code.value = examples[e];
};

const log = ref('');

const logger = (...args: Array<any>) => {
    for (let i = 0; i < args.length; i++) {
        const v = typeof args[i] == 'string' || typeof args[i] == 'number' ? args[i] : JSON.stringify(args[i]);

        log.value += v + ' ';
    }

    log.value += '\n';
};

function runCode() {
    runner(logger, code.value);
}
</script>

<template>
    <div class="flex flex-col h-full">
        <TopBar @run="runCode" @clear="log = ''" @example="setExample" />

        <div class="flex flex-1">
            <div class="self-stretch flex-1 border-r-2 border-r-slate-950">
                <vue-monaco-editor ref="editorRef" v-model:value="code" theme="vs-dark" :options="{
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                }" />
            </div>
            <div class="w-1/3 p-1">
                <pre>{{ log }}</pre>
            </div>
        </div>
    </div>
</template>
