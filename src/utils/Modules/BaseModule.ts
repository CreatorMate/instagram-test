import type {NuxtPage} from "@nuxt/schema";

export default abstract class BaseModule {
    protected abstract moduleRoutes: NuxtPage[];

    public getModuleRoutes(): NuxtPage[] {
        return this.moduleRoutes;
    }
}