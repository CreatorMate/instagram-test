<script setup lang='ts'>
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import {Icon} from "@iconify/vue";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import {API} from "~/src/utils/API/API";

    const accountState = useAccountState();

    const connectedAccounts = ref(0);

    const brands = ref<{ likes: number, name: string}[]>([]);

    onMounted(async () => {
        const brandsRequest: APIResponse = await API.ask(`/brands/${accountState.brand?.id}/creators`);
        if(!brandsRequest.success) return;

        connectedAccounts.value = brandsRequest.data.length;

        for(const creator of brandsRequest.data) {
            const mediaRequest: APIResponse<{likes: number, caption: string}[]> = await API.ask(`/instagram/media?email=${creator.creators.email}`);

            if(!mediaRequest.success) return;

            let totalLikes = 0;
            mediaRequest.data.forEach((mediaItem) => {
                totalLikes += mediaItem.likes;
            });

            brands.value.push({
               likes: totalLikes / mediaRequest.data.length,
               name: creator.creators.email
            })
        }
    });
</script>

<template>
    <div class="flex flex-grow justify-center px-6">
        <div class="w-[850px] max-w-full border-gray-200 border rounded-lg bg-white p-6" v-if="accountState.brand">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-12 h-12 rounded-full flex justify-center items-center bg-gray-200">
                        <p>{{accountState.brand.name.charAt(0)}}</p>
                    </div>
                    <h1 class="text-2xl font-medium">{{accountState.brand.name}}</h1>
                </div>
                <div class="flex gap-3">
                    <p>connected accounts: {{connectedAccounts}}</p>
                </div>
            </div>
            <div class="mt-16" v-if="true">
                <h2 class="font-semibold text-xl">Your creators stats</h2>
                <div v-if="brands.length == 0" class="my-3">you dont have any creators</div>
                <div v-else v-for="brand of brands" class="my-3">
                    <h2 class="font-semibold text-lg ">{{brand.name}}</h2>
                    <div class="w-full h-full flex flex-col gap-3 p-6 text-black rounded-xl border border-[#E2E2E2]">
                        <Icon width="32" icon="material-symbols:groups-outline" />
                        <p class="text-xl font-semibold">{{brand.name}} average likes</p>
                        <p class="text-black font-bold text-4xl">{{brand.likes}}</p>
                    </div>
                </div>

            </div>
        </div>
        <p v-else>You are not connected to a brand.</p>
    </div>
</template>