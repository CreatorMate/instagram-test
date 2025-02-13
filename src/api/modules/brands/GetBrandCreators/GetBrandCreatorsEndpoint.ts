import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetBrandCreatorsEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/brands/:id/creators'

    protected async handle(context: Context) {
        const id = context.req.param('id');

        const brand = await this.prismaClient.brands.findUnique({
            where: {id: Number(id)}
        });

        if(!brand) return errorResponse(context, 'no brand with this id');

        const creator_brands = await this.prismaClient.creator_brand.findMany({
            where: {brand_id: Number(id), accepted: true},
            include: {creators: true}
        });

        return successResponse(context, creator_brands);
    }
}