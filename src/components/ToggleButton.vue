<script setup lang='ts'>
    const {isOn} = defineProps<{
        isOn: boolean
    }>();
    const emits = defineEmits(['toggle']);

    const sliderState = ref(isOn)

    function change() {
        sliderState.value = !sliderState.value;
        emits("toggle", sliderState.value);
    }



</script>

<template>
    <button
        @click="change"
        :class="['w-12 h-6 flex items-center rounded-full p-1 transition duration-300',
              sliderState ? 'bg-black' : 'bg-gray-300']"
    >
        <div
            :class="['w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300',
                sliderState ? 'translate-x-6' : 'translate-x-0']"
        ></div>
    </button>
</template>