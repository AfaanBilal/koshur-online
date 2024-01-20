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

import { ref, shallowRef } from 'vue';
import { useMonaco } from '@guolao/vue-monaco-editor';
import TopBar from './components/TopBar.vue';
import examples from './utils/examples';
import { runner } from './utils/runner.js';
import { koshurConf, language } from './utils/language';

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

const editorRef = shallowRef();
const monaco = useMonaco();

function editorMounted(editor: any) {
    editorRef.value = editor;

    monaco.monacoRef.value?.languages.register({ id: 'koshur' });
    monaco.monacoRef.value?.languages.setLanguageConfiguration('koshur', koshurConf);

    // @ts-ignore
    monaco.monacoRef.value?.languages.setMonarchTokensProvider('koshur', language);
}
</script>

<template>
    <div class="flex flex-col h-full">
        <TopBar @run="runCode" @clear="log = ''" @example="setExample" />

        <div class="flex flex-col flex-1 md:flex-row">
            <div class="flex-1 border-r-2 border-r-slate-950">
                <vue-monaco-editor v-model:value="code" theme="vs-dark" language="koshur" :options="{
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                }" @mount="editorMounted" />
            </div>
            <div class="min-w-full p-1 md:min-w-96 min-h-40 md:min-h-full">
                <pre>{{ log }}</pre>
            </div>
        </div>
    </div>
</template>
