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

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const app = createApp(App);

app.use(VueMonacoEditorPlugin, {
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    },
});

app.mount('#app');
