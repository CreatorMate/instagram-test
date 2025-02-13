import {Endpoint} from "~/src/api/utils/Endpoint";
import type {Context} from "hono";
import type {HonoUser} from "~/src/api/utils/HonoComposables";
import {errorResponse, successResponse} from "~/src/api/utils/HonoResponses";

export class GetSelfEndpoint extends Endpoint {
    protected readonly method: string = 'get'
    protected readonly route: string = '/creators/me'

    protected async handle(context: Context) {
        const honoUser = this.getHonoUser(context);
        let creator: any = await this.getCreator(honoUser);
        if (!creator) {
            creator = await this.createCreator(honoUser);
        }

        if (!creator) return errorResponse(context, "Something went wrong while creating the new creator");

        return successResponse(context, creator);
    }

    private async createCreator(honoUser: HonoUser) {
        return await this.prismaClient.creators.create({
            data: {
                email: honoUser.email,
            }
        });
    }

    private async getCreator(honoUser: HonoUser) {
        let creator = await this.prismaClient.creators.findFirst({
            where: {email: honoUser.email},
            include: {
                brands: true,
            }
        });

        return creator;
    }
}