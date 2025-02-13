<script setup lang='ts'>
    import {useToastState} from "~/src/utils/Toast/ToastState";
    import Toast from "~/src/utils/Toast/Toast.vue";

    const toastState = useToastState();
</script>

<template>
    <section class="absolute bottom-8 right-8 gap-2 flex flex-col">
        <Toast :toast v-for="toast of toastState.toasts"/>
    </section>
</template>