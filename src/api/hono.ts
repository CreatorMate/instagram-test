import {Hono} from "hono";
import {logger} from "hono/logger";
//@ts-ignore
import {getUserSession} from 'nuxt-oidc-auth/runtime/server/utils/session.js'
import dotenv from 'dotenv';
import {initializeHonoRouter} from "~/src/api/router";
import NotFound from "~/src/api/src/middleware/NotFound";
import onError from "~/src/api/src/middleware/OnError";

let app: Hono = new Hono();
dotenv.config();

app.use('');

app.notFound(NotFound);
app.onError(onError);

app.use('*', logger());
app.use('*', async (ctx, next) => {
    try {
        // @ts-ignore
        const user = ctx.req.raw['user'];
        // @ts-ignore
        ctx.set('user', user);
        await next();
    } catch (err: any) {
        return onError(err, ctx);
    }
});

initializeHonoRouter(app);

export default defineEventHandler(async (event) => {
    try {
        event.node.req.originalUrl = '';
        const webReq = toWebRequest(event);
        const session = await getUserSession(event);
        (webReq as any)['user'] = session.userInfo;
        return app.fetch(webReq);
    } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
});
