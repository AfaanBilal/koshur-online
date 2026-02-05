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

import { computed, nextTick, ref, shallowRef, onMounted, onUnmounted } from 'vue';
import { useMonaco } from '@guolao/vue-monaco-editor';
import TopBar from './components/TopBar.vue';
import StatusBar from './components/StatusBar.vue';
import SelectMenu from './components/SelectMenu.vue';
import examples from './utils/examples';
import { runner } from './utils/runner.js';
import { koshurConf, language, KOSHUR } from './utils/language';

const exampleKeys = Object.keys(examples);
const chosenExample = ref(exampleKeys[0]);
const code = ref(examples['Hello world!']);
const log = ref(``);
const clearConsoleOnRun = ref(false);
const status = ref('Ready');
const cursorLine = ref(1);
const cursorColumn = ref(1);

const isLogEmpty = computed(() => log.value == '');

const setExample = (e: keyof typeof examples) => {
    code.value = examples[e];
};

const handleExampleChange = (val: string) => {
    setExample(val as keyof typeof examples);
}

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
    status.value = 'Running...';
    if (clearConsoleOnRun.value) {
        clearLog();
    }

    try {
        runner(logger, code.value);
        status.value = 'Success';
    } catch (e) {
        status.value = 'Error';
        logger(e);
    }

    // Reset status after a delay
    setTimeout(() => {
        if (status.value === 'Success') status.value = 'Ready';
    }, 2000);
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

    // Cursor tracking
    editor.onDidChangeCursorPosition((e: any) => {
        cursorLine.value = e.position.lineNumber;
        cursorColumn.value = e.position.column;
    });

    // Add Key Bindings to Monaco
    const m = monaco.monacoRef.value;
    if (m) {
        // Ctrl+Enter or Cmd+Enter to Run
        editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.Enter, () => {
            runCode();
        });

        // Ctrl+L or Cmd+L to Clear
        editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.KeyL, () => {
            clearLog();
        });
    }
};

// Resizing Logic
const consoleWidth = ref(500); // Initial fallback
const isResizing = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const isMobile = ref(false); // Track mobile state

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768; // md breakpoint
};

const startResize = () => {
    if (isMobile.value) return; // Disable on mobile
    isResizing.value = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection
};

const handleResize = (e: MouseEvent) => {
    if (!containerRef.value) return;
    const containerRect = containerRef.value.getBoundingClientRect();
    const newWidth = containerRect.right - e.clientX;
    // Min width constraints
    if (newWidth > 200 && newWidth < containerRect.width - 200) {
        consoleWidth.value = newWidth;
    }
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
};

// Keyboard Shortcuts
const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearLog();
    }
};

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set initial console width to 30% of the screen for a 70/30 split
    if (!isMobile.value) {
        consoleWidth.value = window.innerWidth * 0.30;
    }

    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="flex flex-col h-full font-pl bg-slate-950">
        <TopBar />

        <div class="flex flex-col flex-1 overflow-hidden md:flex-row" ref="containerRef">
            <!-- Editor Pane -->
            <div class="flex flex-col flex-1 min-w-0 h-1/2 md:h-auto">
                <div class="flex items-center justify-between px-4 py-2 border-b bg-slate-900 border-slate-800">
                    <span
                        class="hidden text-xs font-bold tracking-wider uppercase sm:block text-slate-500">Editor</span>

                    <div class="flex items-center gap-3 ml-auto sm:ml-0">
                        <div class="relative w-40">
                            <SelectMenu v-model="chosenExample" :options="exampleKeys" @change="handleExampleChange" />
                        </div>

                        <div class="flex items-center gap-2">
                            <button
                                class="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white transition-all bg-green-600 rounded shadow-lg hover:bg-green-500 active:bg-green-700 active:scale-95 shadow-green-900/20 ring-1 ring-inset ring-green-500/10"
                                @click="runCode" title="Ctrl+Enter to Run">
                                <span>Run</span>
                                <span class="text-base leading-none">&rtrif;</span>
                            </button>
                            <span
                                class="hidden text-[10px] text-slate-500 sm:inline bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-700/50">
                                Ctrl+Enter
                            </span>
                        </div>
                    </div>
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

            <!-- Resizer Handle -->
            <div class="hidden w-1 transition-colors border-l cursor-col-resize md:flex bg-slate-950 hover:bg-blue-500 border-slate-800"
                :class="{ 'bg-blue-500': isResizing }" @mousedown.prevent="startResize"></div>

            <!-- Console Pane -->
            <div class="flex flex-col w-full md:h-full border-t md:border-t-0 border-slate-800 h-1/2 md:flex-initial"
                :style="!isMobile ? { width: isResizing || consoleWidth ? `${consoleWidth}px` : 'auto' } : {}">
                <!-- Console Toolbar -->
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
                    <div class="flex items-center gap-2">
                        <span
                            class="hidden text-xs font-bold tracking-wider uppercase sm:block text-slate-500">Console</span>
                    </div>

                    <div class="flex items-center gap-4 ml-auto sm:ml-0">
                        <label
                            class="flex items-center gap-2 text-xs cursor-pointer select-none text-slate-400 hover:text-slate-200">
                            <input type="checkbox" v-model="clearConsoleOnRun"
                                class="w-3.5 h-3.5 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0">
                            Auto-clear
                        </label>

                        <div class="flex items-center gap-2">
                            <button
                                class="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 transition-all rounded hover:text-white hover:bg-slate-800 active:bg-slate-700"
                                :class="{ 'opacity-50 pointer-events-none': isLogEmpty }" @click="clearLog"
                                :disabled="isLogEmpty" title="Ctrl+L to Clear">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear
                            </button>
                            <span
                                class="hidden text-[10px] text-slate-500 sm:inline bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-700/50">
                                Ctrl+L
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Console Output -->
                <div class="flex-1 overflow-auto custom-scrollbar bg-slate-950">
                    <pre class="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-300 selection:bg-blue-500/30"
                        ref="logRef">{{ log }}</pre>
                </div>
            </div>
        </div>

        <StatusBar :cursor-line="cursorLine" :cursor-column="cursorColumn" language="Koshur" :status="status" />
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
