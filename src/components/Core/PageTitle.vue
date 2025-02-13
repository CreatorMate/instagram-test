<script setup lang='ts'>
    const {title, subTitle} = defineProps<{
        title: string,
        subTitle?: string
    }>()
</script>

<template>
    <div class="flex flex-col text-text-dark gap-2">
        <h1 class="text-2xl font-semibold">{{title}}</h1>
        <h2 v-if="subTitle">{{subTitle}}</h2>
    </div>
</template>