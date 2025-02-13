import {NOT_FOUND} from "../http-status-codes";
import type {Context, NotFoundHandler} from "hono";

const notFound: NotFoundHandler = (c: Context) => {
    c.status(404);
    return c.json({
        success: false,
        message: `${NOT_FOUND} - ${c.req.path}`
    }, NOT_FOUND);
};

export default notFound;