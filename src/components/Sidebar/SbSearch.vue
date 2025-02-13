<script setup lang='ts'>

import {Icon} from "@iconify/vue";
</script>

<template>
    <div class="relative w-full">
        <Icon class="absolute left-5 top-[22px]" width="16px" height="16px" icon="lineicons:search-1"/>
        <input placeholder="search" class="text-sm mt-2 w-full px-10 py-3 rounded-3xl border border-black border-opacity-10 outline-none" type="text" />
        <div class="absolute right-5 bg-gray-200 top-[19px] rounded px-1.5 flex gap-1 items-center">
            <Icon width="14" icon="material-symbols:keyboard-command-key"></Icon>
            <p>k</p>
        </div>
    </div>

</template>