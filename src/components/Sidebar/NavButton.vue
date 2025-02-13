<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import type {NavItem} from "./NavItem";
    import {onMounted} from "vue";

    const {name, iconName, linkTo, children, premium} = defineProps<{
        name: string,
        iconName: string,
        linkTo: string,
        premium: boolean
        children: NavItem[]
    }>();
    const route = useRoute();

    const isHoveringParent = ref(false)
    const show = ref(false)
    function isActive(path: string) {
        return route.fullPath === path;
    }

    watch(route, () => {
        for (const child of children) {
            if(isActive(child.linkTo)) {
                show.value = true;
                break;
            }
        }
    })


</script>

<template>
    <NuxtLink :to="linkTo" @mouseenter="isHoveringParent = true" @mouseleave="isHoveringParent = false" :class="{
        'bg-[#E2E2E2] text-text-dark' : isActive(linkTo) && children.length === 0
    }" @click="show = !show" class="flex py-3 px-5 items-center justify-between cursor-pointer rounded-xl">
        <div :class="{'translate-x-4': isHoveringParent}" class="flex items-center gap-3 transition duration-100">
            <Icon width="20" :icon="iconName"/>
            <p class="text-sm">{{name}}</p>
        </div>
        <div class="bg-background-foreground rounded-2xl py-1 px-4" v-if="premium">
            <p class="text-xs ">upgrade</p>
        </div>
        <div v-else-if="children.length > 0">
            <Icon :class="{'rotate-180': show}" icon="solar:alt-arrow-down-line-duotone" />
        </div>
    </NuxtLink>
</template>