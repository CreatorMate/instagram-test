<script setup lang='ts'>
    import {type IToast, useToastState} from "~/src/utils/Toast/ToastState";
    import {Icon} from "@iconify/vue";

    const {toast} = defineProps<{
        toast: IToast
    }>();

    const toastState = useToastState();
</script>

<template>
    <div :class="[toast.success ? 'bg-[#A9E2C7]' : 'bg-[#EACFD1]']" @mouseenter="toastState.pauseToast(toast.id)" @mouseleave="toastState.resumeToast(toast.id)" @click="toastState.removeToast(toast.id)" class="flex items-center px-3 py-2 shadow z-[100] cursor-pointer toast">
        <Icon v-if="!toast.success" width="24" icon="material-symbols:info-outline"/>
        <Icon v-else width="24" icon="material-symbols:check-circle-outline"/>
        <div class="ml-3 mr-20">
            <p>{{toast.success ? 'success' : 'error'}}</p>
            <p>{{toast.message}}</p>
        </div>
       <div class="h-full flex">
            <Icon width="24" icon="material-symbols:close-small-outline"/>
       </div>
    </div>
</template>

<style scoped>
.toast {
    animation: 500ms fadeInUp;
}
</style>
