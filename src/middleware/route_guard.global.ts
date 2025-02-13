import type {RouteLocationNormalized} from "#vue-router";
import {checkUnguarded} from "~/src/utils/GuardChecker";
import {useAccountState} from "~/src/utils/Auth/AccountState";
import {appSettings} from "~/src/GlobalSettings";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (checkUnguarded(to)) return;
    const runtimeConfig = useRuntimeConfig();
    appSettings.baseUrl = runtimeConfig.public.BASE_URL;

    const {login, loggedIn} = useOidcAuth();

    if(to.path.includes('login')) return;
    if(!loggedIn.value) {
        return navigateTo('/login');
    }

    const accountStore = useAccountState();
    if(!accountStore.user) {
        await accountStore.initialize();
    }
    if(accountStore.user) {
        console.log(to.path);
        if(!accountStore.user.access_token && to.path !== '/creators/link' && to.path.includes('creators')) {
            return navigateTo('/creators/link');
        }
    }
});