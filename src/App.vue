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

import { computed, nextTick, ref, shallowRef } from 'vue';
import { useMonaco } from '@guolao/vue-monaco-editor';
import TopBar from './components/TopBar.vue';
import examples from './utils/examples';
import { runner } from './utils/runner.js';
import { koshurConf, language, KOSHUR } from './utils/language';

const code = ref(examples['Hello world!']);
const log = ref(`Console\n=======\n\n`);
const clearConsoleOnRun = ref(false);

const isLogEmpty = computed(() => log.value == 'Console\n=======\n\n');

const setExample = (e: keyof typeof examples) => {
    code.value = examples[e];
};

const logger = (...args: Array<any>) => {
    for (let i = 0; i < args.length; i++) {
        const v = typeof args[i] == 'string' || typeof args[i] == 'number' ? args[i] : JSON.stringify(args[i]);

        log.value += v + ' ';
    }

    log.value += '\n';

    nextTick(() => { logRef.value.scrollTop = logRef.value.scrollHeight; });
};

const clearLog = () => {
    log.value = 'Console\n=======\n\n';
};

const runCode = () => {
    if (clearConsoleOnRun.value) {
        clearLog();
    }

    runner(logger, code.value);
};

const logRef = ref();
const editorRef = shallowRef();
const monaco = useMonaco();

const editorMounted = (editor: any) => {
    editorRef.value = editor;

    monaco.monacoRef.value?.languages.register({ id: KOSHUR });
    monaco.monacoRef.value?.languages.setLanguageConfiguration(KOSHUR, koshurConf);

    // @ts-ignore
    monaco.monacoRef.value?.languages.setMonarchTokensProvider(KOSHUR, language);
};
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden">
        <TopBar @run="runCode" @clear="clearLog" @example="setExample" />

        <div v-show="!isLogEmpty"
            class="fixed px-2 py-1 border rounded cursor-pointer select-none bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-slate-950 bottom-[7.5rem] md:bottom-auto md:top-20 right-2"
            @click="clearLog">
            Clear &Cross;
        </div>

        <label for="clearOnRun"
            class="fixed px-2 py-1 border rounded cursor-pointer select-none bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-slate-950 bottom-[7.5rem] md:bottom-auto md:top-20"
            :class="{'right-2': isLogEmpty, 'right-24': !isLogEmpty}">
            <input id="clearOnRun" type="checkbox" v-model="clearConsoleOnRun"> Auto-clear on Run
        </label>

        <div class="flex flex-col flex-1 md:flex-row h-[calc(100vh-62px)]">
            <div class="flex-1 border-r-2 border-r-slate-950">
                <vue-monaco-editor v-model:value="code" theme="vs-dark" language="koshur" :options="{
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                }" @mount="editorMounted" />
            </div>
            <pre class="w-full h-40 p-1 overflow-auto md:w-1/3 md:h-[calc(100vh-62px)] bg-slate-900"
                ref="logRef">{{ log }}</pre>
        </div>
    </div>
</template>
