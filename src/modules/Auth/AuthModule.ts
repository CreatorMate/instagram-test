import BaseModule from "../../utils/Modules/BaseModule";
import type {NuxtPage} from "@nuxt/schema";

export class AuthModule extends BaseModule {
    protected moduleRoutes: NuxtPage[] = [
        {
            name: 'login',
            file: '@/src/modules/Auth/pages/LoginView.vue',
            path: '/login'
        },
        {
            name: 'logout',
            file: '@/src/modules/Auth/pages/Logout.vue',
            path: '/auth/auth0/logout'
        }
    ]
}