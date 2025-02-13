import {defineStore} from "pinia";
import type {Brand, User} from "~/src/utils/SupabaseTypes";
import type {APIResponse} from "~/src/api/utils/HonoResponses";
import {appSettings} from "~/src/GlobalSettings";
import {API} from "~/src/utils/API/API";

export const useAccountState = defineStore("account", () => {
    const user = ref<User|null>(null);
    const brand = ref<Brand|null>(null);

    async function initialize() {
        try {
            const result: APIResponse<User> = await API.ask(`/creators/me`);
            if (!result.success) return;
            if (result.data) {
                user.value = result.data;
                brand.value = result.data.brands
            }
        } catch (error) {
        }
    }

    async function save() {
        const result = await $fetch(`${appSettings.baseUrl}/API/users/me`, {
            method: "PUT",
            body: JSON.stringify(user.value)
        });
    }

    return {initialize, user, save, brand}
})