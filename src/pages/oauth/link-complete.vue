<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {useAccountState} from "~/src/utils/Auth/AccountState";

    const router = useRouter();
    const route = useRoute();
    const error = ref(false);
    const accountState = useAccountState();

    const code = route.query.code;

    onMounted(async () => {
        const result: APIResponse<{ access_token: string, user_id: number }> = await API.ask('/instagram/login', 'POST', {
            code: code
        });
        if (result.success) {
            await accountState.initialize();
            await router.replace('/creators')
        } else {
            error.value = true;
        }
    });
</script>

<template>
    <div class="flex flex-col gap-6 m-12">
        connecting...
        <p v-if="error" class="text-red-500 ">something went wrong while connecting your IG</p>
        <nuxt-link v-if="error" to="/creators/link">try again</nuxt-link>
    </div>
</template>