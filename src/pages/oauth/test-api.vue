<script setup lang='ts'>
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";

    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');

    let data = ref<any>();
    let url = ref("");

    const result: APIResponse = await API.ask(`/instagram/me?access_token=${access_token}&userId=${user_id}`);
    const media = await API.ask(`/instagram/media?access_token=${access_token}&userId=${result.data.user_id}`);

    async function call() {
        if(!result.success) return;
        const open: APIResponse = await API.ask(`/instagram/open`, 'POST',{
            url: url.value,
            user_id: result.data.user_id,
            access_token: access_token
        });

        if(!open.success) return;

        data.value = open.data;
    }

</script>

<template>
    <section class="flex flex-col gap-6 w-full">
<!--        <p>{{access_token}}</p>-->
        <p>{{result}}</p>
        <div class="w-full flex">
            <input class="border border-gray-200 rounded-l px-3 py-1.5 flex flex-grow" v-model="url">
            <button @click="call" class="border border-gray-200 bg-black text-white px-3 py-1.5 rounded-r">test</button>
        </div>

        <p>{{data}}</p>
    </section>

</template>