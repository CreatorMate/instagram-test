<script setup lang='ts'>
    const {direction} = defineProps<{
        direction: string,
    }>();
</script>

<template>
    <div class="flex whitespace-nowrap relative">
        <div :class="[
            direction === 'left' ? 'home-carousel-left' : 'home-carousel-right'
        ]" class="flex gap-6 overflow-hidden duration-150">
            <slot></slot>
        </div>
        <div :class="[
            direction === 'left' ? 'home-carousel-left' : 'home-carousel-right'
        ]" class="flex gap-6 overflow-hidden ">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.home-carousel-left {
    animation: 90s slide-left infinite linear;
}

.home-carousel-right {
    animation: 90s slide-right infinite linear;
}

@keyframes slide-left {
    from {
        transform: translateX(0);
        -webkit-transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@keyframes slide-right {
    from {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
        -webkit-transform: translateX(0);
    }
}

@-webkit-keyframes slide-left {
    from {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    to {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
}

@-webkit-keyframes slide-right {
    from {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
    to {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
</style>