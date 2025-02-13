<script setup lang='ts'>
    import {bool} from "sharp";

    const props = defineProps<{
        open: boolean,
        title: string,
        subtitle: string
    }>();

    const emits = defineEmits(['cancel', 'delete']);

    const {open} = toRefs(props);
</script>

<template>
    <ModalPopup @close="emits('cancel')" :model-active="open">
        <div class="bg-background-foreground p-10 rounded-xl w-[500px]">
            <h1 class="font-semibold text-2xl mb-14">{{title}}</h1>
            <p class="whitespace-pre-wrap mb-10">{{subtitle}}</p>
            <div class="flex justify-end gap-2">
                <button class="px-3 py-2 rounded-lg bg-background hover:bg-gray-200" @click="emits('cancel')">cancel</button>
                <button class="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white" @click="emits('delete')">delete</button>
            </div>
        </div>
    </ModalPopup>
</template>