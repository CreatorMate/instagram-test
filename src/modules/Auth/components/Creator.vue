<script setup lang='ts'>
    import {Creator} from "@/creators";
    const {creator} = defineProps<{
        creator: Creator,
    }>();
</script>

<template>
    <div class="flex flex-col text-center font-medium p-2">
        <img :alt="`Creatormate friend ${creator.name}`" class="min-h-[220px] min-w-[220px]  xs:min-w-[280px] xs:min-h-[280px] md:min-w-[300px] md:min-h-[300px] xl:min-h-[360px] xl:min-w-[360px] 4xl:min-h-[400px] 4xl:min-w-[400px] 5xl:min-h-[600px] 5xl:min-w-[600px] 6xl:min-h-[700px] 6xl:min-w-[700px] object-cover rounded-lg" :src="`/creators/${creator.name}.png`">
        <div class="flex flex-col py-4">
            <h3 class="text-xl md:text-3xl">{{creator.name}}</h3>
            <p class="text-lg md:text-2xl text-white text-opacity-40">{{creator.followers}} followers</p>
        </div>
    </div>
</template>