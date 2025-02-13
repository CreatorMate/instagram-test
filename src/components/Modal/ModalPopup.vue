<script setup lang='ts'>
    defineProps({
        modelActive: {
            type: Boolean,
            default: false,
        }
    })
    const emit = defineEmits(["close"]);
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div @click="emit('close')" v-show="modelActive"
                 class="absolute top-0 screen-size flex justify-center items-center z-40 bg-black bg-opacity-10 backdrop-blur-[2px]">
                <Transition name="modal-inner">
                    <div v-if="modelActive" @click.stop>
                        <slot  ></slot>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-outer-enter-active, .modal-outer-leave-active {
    transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from, .modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.1s;
}

.modal-inner-leave-active {
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>