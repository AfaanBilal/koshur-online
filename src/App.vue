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
const log = ref(``);
const clearConsoleOnRun = ref(false);

const isLogEmpty = computed(() => log.value == '');

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
    log.value = '';
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
    <div class="flex flex-col h-full font-pl bg-slate-950">
        <TopBar @run="runCode" @clear="clearLog" @example="setExample" />

        <div class="flex flex-col flex-1 overflow-hidden md:flex-row">
            <!-- Editor Pane -->
            <div class="flex flex-col flex-1 border-b md:border-b-0 md:border-r border-slate-800">
                <div class="flex items-center justify-between px-4 py-2 border-b bg-slate-900 border-slate-800">
                    <span class="text-xs font-bold tracking-wider uppercase text-slate-500">Editor</span>
                </div>
                <div class="relative flex-1">
                    <vue-monaco-editor v-model:value="code" theme="vs-dark" language="koshur" :options="{
                        automaticLayout: true,
                        formatOnType: true,
                        formatOnPaste: true,
                        padding: { top: 16 },
                        fontFamily: 'Inter, monospace',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                    }" @mount="editorMounted" class="absolute inset-0" />
                </div>
            </div>

            <!-- Console Pane -->
            <div class="flex flex-col w-full md:w-1/3 min-w-[300px] bg-slate-900">
                <!-- Console Toolbar -->
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
                    <span class="text-xs font-bold tracking-wider uppercase text-slate-500">Console Output</span>

                    <div class="flex items-center gap-4">
                        <label
                            class="flex items-center gap-2 text-xs cursor-pointer select-none text-slate-400 hover:text-slate-200">
                            <input type="checkbox" v-model="clearConsoleOnRun"
                                class="w-3.5 h-3.5 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0">
                            Auto-clear
                        </label>

                        <button
                            class="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 transition-all rounded hover:text-white hover:bg-slate-800 active:bg-slate-700"
                            :class="{ 'opacity-50 pointer-events-none': isLogEmpty }" @click="clearLog"
                            :disabled="isLogEmpty">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear
                        </button>
                    </div>
                </div>

                <!-- Console Output -->
                <div class="flex-1 overflow-auto custom-scrollbar bg-slate-950">
                    <pre class="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-300"
                        ref="logRef">{{ log }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Custom Scrollbar for Webkit */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #0f172a;
    /* slate-950 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
    /* slate-700 */
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #475569;
    /* slate-600 */
}
</style>
