<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import TopBar from './components/TopBar.vue';

const code = ref(`
wan("Hello, world!");
`);
const editorRef = shallowRef();

function formatCode() {
    editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>

<template>
    <div class="flex flex-col h-full">
        <TopBar />

        <div class="flex flex-1">
            <div class="self-stretch flex-1 border-r-2 border-r-slate-950">
                <vue-monaco-editor ref="editorRef" v-model:value="code" theme="vs-dark" :options="{
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                }" />
            </div>
            <div class="flex-1">
                <pre>
> Ready!
                </pre>
            </div>
        </div>

        <div class="flex p-1 bg-slate-950">
            <div class="p-1 border" @click="formatCode">Format</div>
            <div class="text-2xl">AAAAAAAAAAAAAA</div>
        </div>
    </div>
</template>
