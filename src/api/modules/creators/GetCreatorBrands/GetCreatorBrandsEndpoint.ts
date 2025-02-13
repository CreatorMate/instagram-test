import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetCreatorBrandsEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creator/:id/brands'

    protected async handle(context: Context) {
        const id = context.req.param('id');

        const creator = await this.prismaClient.creators.findUnique({
            where: {id: id}
        });

        if(!creator) return errorResponse(context, 'no creator with this id', 404);

        const creator_brands = await this.prismaClient.creator_brand.findMany({
            where: {creator_id: creator.id}
        });

        const brands: {id: number, name: string, accepted: boolean}[] = [];

        for(const brandOffer of creator_brands) {
            const brand: any =  await this.prismaClient.brands.findFirst({
                where: {id: brandOffer.brand_id}
            });

            if(!brand) continue;

            brand.accepted = brandOffer.accepted;
            brands.push(brand);
        }

        return successResponse(context, brands);
    }
}