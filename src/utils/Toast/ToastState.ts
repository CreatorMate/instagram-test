import {defineStore} from "pinia";

export interface IToast {
    id: number,
    message: string,
    timeoutId: number,
    startTime: number,
    remainingTime: number,
    isPaused: boolean,
    success: boolean
}

export const useToastState = defineStore("toasts", () => {
    const nextId = ref(0);
    const toasts = ref<IToast[]>([]);

    function addToast(message: string, success: boolean = false, duration: number = 5000){
        const id = nextId.value;
        nextId.value++;
        const startTime = Date.now();
        const toast: IToast = {
            id,
            message,
            timeoutId: 0,
            startTime,
            remainingTime: duration,
            isPaused: false,
            success
        };

        toast.timeoutId = window.setTimeout(() => removeToast(id), duration);
        toasts.value.push(toast);
    }

    function pauseToast(id: number) {
        const toast = toasts.value.find(t => t.id === id);
        if (toast && !toast.isPaused) {
            window.clearTimeout(toast.timeoutId);
            const elapsed = Date.now() - toast.startTime;
            toast.remainingTime = toast.remainingTime - elapsed;
            toast.isPaused = true;
        }
    }

    function resumeToast(id: number) {
        const toast = toasts.value.find(t => t.id === id);
        if (toast && toast.isPaused) {
            toast.startTime = Date.now();
            toast.timeoutId = window.setTimeout(
                () => removeToast(id),
                toast.remainingTime
            );
            toast.isPaused = false;
        }
    }

    function removeToast(id: number) {
        toasts.value = toasts.value.filter((toast) => {
            if (toast.id === id) {
                window.clearTimeout(toast.timeoutId);
                return false;
            }
            return true;
        });
    }

    return {toasts, nextId, addToast, removeToast, pauseToast, resumeToast}
});