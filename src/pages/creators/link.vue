<script setup lang='ts'>

import {Icon} from "@iconify/vue";

const config = useRuntimeConfig();

const client_id = config.public.META_CLIENT_ID;

console.log(client_id)
const redirect_uri =  config.public.META_REDIRECT_URL;

function link() {
    location.href = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=instagram_business_basic,instagram_business_manage_insights`
}
</script>

<template>
    <div class="flex flex-grow justify-center px-6">
        <div class="w-[850px] max-w-full mt-20 ">
            <h1 class="text-2xl font-medium">Application: Accepted</h1>
            <p class="text-[#8D8D8D] font-medium mt-2 w-[440px] max-w-full">Congratulations we reviewed your application and decided we would like to work with you! only thing to do now is to link your instagram data to the platform, after linking no one can access your data without your permission.</p>
<!--            <div class="mt-2">-->
<!--                <a class="underline cursor-pointer">click here if you want to know why we need this</a>-->
<!--            </div>-->

            <div class="my-10">
                <button @click="link"
                        class="bg-[#C13584] text-white px-14 py-3 rounded-lg disabled:bg-gray-400 flex gap-2 items-center">
                    <icon width="24" icon="mdi:instagram"/>
                    sign in with Instagram
                </button>
            </div>

            <p>join and work with our creators & brands</p>
        </div>
    </div>
</template>