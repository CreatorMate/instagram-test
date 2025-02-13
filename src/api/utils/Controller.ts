import type {Context, Hono} from "hono";
import type {HonoUser} from "~/src/api/utils/HonoComposables";

export abstract class Controller {
    protected app: Hono;
    constructor(app: Hono) {
        this.app = app;
    }

    protected getHonoUser(ctx: Context): HonoUser {
        return ctx.get('user');
    }

    abstract endpoints(): Promise<any>
}