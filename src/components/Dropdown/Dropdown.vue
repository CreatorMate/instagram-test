<script setup lang='ts'>
    const props = defineProps<{
        open: boolean
    }>()

    const emits = defineEmits(['close']);

    const {open} = toRefs(props);
    const menu = ref(null);

    onClickOutside(menu, event => emits('close'));
</script>

<template>
    <div class="relative">
        <Transition>
            <div ref="menu" class="absolute bg-white top-0 right-0 " v-if="open">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

</style>