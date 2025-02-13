<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    import type {IGProfile} from "~/src/api/modules/instagram/IgTypes";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";
    import ToggleButton from "~/src/components/ToggleButton.vue";

    const accountState = useAccountState();

    const profile = ref<null|IGProfile>(null);

    const brands = ref<{ id: number, name: string, accepted: boolean }[]>([]);

    const likes = ref(0);

    onMounted(async () => {
        const profileRequest: APIResponse<IGProfile> = await API.ask(`/instagram/me?email=${accountState.user?.email}`);
        const mediaRequest: APIResponse<{likes: number, caption: string}[]> = await API.ask(`/instagram/media?email=${accountState.user?.email}`);
        const brandsRequest: APIResponse = await API.ask(`/creator/${accountState.user?.id}/brands`);

        if(!profileRequest.success || !mediaRequest.success || !brandsRequest.success) return;

        let totalLikes = 0;
        mediaRequest.data.forEach((mediaItem) => {
            totalLikes += mediaItem.likes;
        });

        likes.value = totalLikes / mediaRequest.data.length;
        profile.value = profileRequest.data;
        brands.value = [...brandsRequest.data];
    });

    async function check(checked: boolean, brandId: number) {
        await API.ask(`/creator/${accountState.user?.id}/brand`, 'PUT', {
            accepted: checked,
            brand_id: brandId
        });
    }

</script>

<template>
    <div class="flex flex-grow justify-center px-6">
        <div class="w-[850px] max-w-full border-gray-200 border rounded-lg bg-white p-6" v-if="profile">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img class="w-12 h-12 rounded-full" :src="profile.profile_picture_url">
                    <h1 class="text-2xl font-medium">Welcome: {{profile.name}}</h1>
                </div>
                <div class="flex gap-3">
                    <p>followers: {{profile.followers_count}}</p>
                    <p>following: {{profile.follows_count}}</p>
                    <p>posts: {{profile.media_count}}</p>
                </div>
            </div>
            <p class="mt-6">{{profile.biography}}</p>
            <div>
                <div class="w-full h-full flex flex-col gap-3 p-6 text-black rounded-xl border border-[#E2E2E2]">
                    <Icon width="32" icon="material-symbols:groups-outline" />
                    <p class="text-xl font-semibold">average likes</p>
                    <p class="text-black font-bold text-4xl">{{likes}}</p>
                </div>
            </div>
            <div class="mt-6 border-t w-full border-gray-200 pt-6">
                <h2 class="font-semibold text-lg">the following brands want to work with you</h2>
                <p>When accepting the invitation of a brand, you allow them to read the data out of your instagram profile for analytic purposes, they cannot use any of this data for themselves, they can only view it in specific anlytics like user a has an average like rate of 120.241 they may contact you on your email adress {{accountState.user?.email}} for available work.</p>
                <div class="flex flex-col mt-6 gap-2">
                    <div class="flex items-center justify-between w-full" v-for="brand of brands">
                        <p class="text-lg">@{{ brand.name }}</p>
                        <ToggleButton @toggle="check($event, brand.id)" :is-on="brand.accepted"/>
                    </div>
                </div>
            </div>
        </div>
        <p v-else>loading...</p>
    </div>
</template>