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

        <div class="flex items-center gap-4 ml-auto text-sm font-medium text-slate-400">
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
