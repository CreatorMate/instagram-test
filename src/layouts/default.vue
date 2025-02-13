<script setup lang='ts'>
    import Sidebar from "~/src/components/Sidebar/Sidebar.vue";
    import {useFrameState} from "~/src/utils/FrameState";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {Icon} from "@iconify/vue";
    import {sendTo} from "~/src/utils/utils";

    const frameRef = ref<HTMLDivElement | null>(null);

    const frameState = useFrameState();

    const accountState = useAccountState();

    const {logout} = useOidcAuth();

    onMounted(() => {
        frameState.setFrameRef(frameRef);
    });
</script>

<template>
    <section class="flex screen-size flex-col">
        <nav class="w-full flex px-12 py-6 items-center border-b border-[#E9E9E9] justify-between">
            <NuxtLink to="/"><img alt="creatormate-logo" class="h-5" src="/logo-light.svg"></NuxtLink>
            <button class="bg-black text-white py-2 px-4 rounded" @click="logout()">logout</button>
        </nav>
        <slot/>
    </section>

</template>