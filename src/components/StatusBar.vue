<template>
    <footer
        class="flex items-center justify-between px-3 py-1 text-xs border-t select-none bg-slate-950 border-slate-800 text-slate-500 font-mono">
        <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {{ language }}
            </span>
            <span class="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Ln {{ cursorLine }}, Col {{ cursorColumn }}
            </span>
        </div>

        <div class="flex items-center gap-4">
            <span
                :class="{ 'text-blue-400': status === 'Ready', 'text-yellow-400': status === 'Running...', 'text-green-400': status === 'Success', 'text-red-400': status.startsWith('Error') }">
                {{ status }}
            </span>
            <span class="hidden sm:inline hover:text-slate-300 transition-colors">
                UTF-8
            </span>
        </div>
    </footer>
</template>

<script setup lang="ts">
defineProps<{
    cursorLine: number;
    cursorColumn: number;
    language: string;
    status: string;
}>();
</script>
