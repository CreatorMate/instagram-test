import type {RouteLocationNormalized} from "#vue-router";
import {appSettings} from "~/src/GlobalSettings";

export function checkUnguarded(to: RouteLocationNormalized) {
    return appSettings.unGuardedRoutes.some((routePattern: string | RegExp) => {
        if (routePattern instanceof RegExp) {
            return routePattern.test(to.path);
        }

        return routePattern === to.path;
    })
}