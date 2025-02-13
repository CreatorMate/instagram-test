import {defineStore} from "pinia";
import type {Ref} from "vue";

export const useFrameState = defineStore("frameState", () => {
    const frameRef = ref<Ref<HTMLDivElement|null>>();

    function setFrameRef(newFrameRef: Ref<HTMLDivElement|null>) {
        frameRef.value = newFrameRef
    }

    return {frameRef, setFrameRef}
});