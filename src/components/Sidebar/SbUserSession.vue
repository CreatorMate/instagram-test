<script setup lang='ts'>
    import {Icon} from "@iconify/vue";
    import {useAccountState} from "~/src/utils/Auth/AccountState";
    const {user, logout, fetch} = useOidcAuth();
    const accountState = useAccountState();
</script>

<template>
    <div class="bg-background-foreground rounded-xl p-2 flex justify-between items-center text-text-light border border-[#E2E2E2]">
        <div class="flex gap-4 items-center">
            <nuxt-img v-if="accountState.user?.picture" class="rounded-xl w-12 h-12" :src="'https://mfouoyeneddsfujxfjci.supabase.co/storage/v1/object/public/user_pictures/' + accountState.user.picture "></nuxt-img>
            <nuxt-img v-else class="rounded-xl w-12 h-12" :src="user?.userInfo?.picture"></nuxt-img>
            <div class="flex flex-col">
                <p class="text-sm text-text-dark lowercase">{{accountState.user?.full_name ?? user?.userInfo?.nickname }}</p>
                <p class="text-xs">{{accountState.brand?.name}}</p>
            </div>
        </div>
        <Icon size="20" class="mr-4 hover:text-black cursor-pointer transition duration-100 text-gray-950" @click="logout()" icon="material-symbols:logout"></Icon>
    </div>
</template>