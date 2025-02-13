import {type Context, Hono} from "hono";
import {getPrismaClient, type HonoUser} from "~/src/api/utils/HonoComposables";

export abstract class Endpoint {
    protected abstract readonly route: string;
    protected abstract readonly method: string;
    protected abstract handle(context: Context): any;
    private supportedMethods = ['get', 'post', 'put', 'delete', 'patch', 'options'];
    protected API_KEY: string = <string>process.env.CREATOR_API_KEY;
    protected prismaClient = getPrismaClient();

    public register(app: Hono): void {
        if (!this.supportedMethods.includes(this.method.toLowerCase())) {
            throw new Error(`Unsupported HTTP method: ${this.method} in ${this.route}`);
        }

        //@ts-ignore
        app[this.method](this.route, this.handle.bind(this));
    }


    protected getHonoUser(ctx: Context): HonoUser {
        return ctx.get('user');
    }
}