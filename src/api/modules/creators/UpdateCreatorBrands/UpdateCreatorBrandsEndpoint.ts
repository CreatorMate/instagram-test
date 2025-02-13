import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class UpdateCreatorBrandsEndpoint extends Endpoint {
    protected readonly method: string = 'put'
    protected readonly route: string = '/creator/:id/brand'

    protected async handle(context: Context) {
        const id = context.req.param('id');
        const {brand_id, accepted} = await context.req.json();

        const newBrandOffer = await this.prismaClient.creator_brand.updateMany({
            where: {creator_id: id, brand_id: brand_id as number},
            data: {
                accepted: accepted
            }
        });

        return successResponse(context, newBrandOffer, null, 'updated preference');
    }
}