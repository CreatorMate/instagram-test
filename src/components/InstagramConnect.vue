<script setup lang='ts'>

    const config = useRuntimeConfig();

    const client_id = config.public.META_CLIENT_ID;
    const redirect_uri =  config.public.META_REDIRECT_URL;
    const config_id=  config.public.META_CONFIG_ID;
    function link() {
        location.href = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=518787711231405&redirect_uri=https://localhost:3000/oauth/link-complete&response_type=code&scope=instagram_business_basic,instagram_business_manage_insights`
    }
</script>

<template>
    <button @click="link" class="px-3">connect ig</button>
</template>