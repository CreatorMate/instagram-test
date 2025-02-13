import type {Endpoint} from "~/src/api/utils/Endpoint";
import type {Controller} from "~/src/api/utils/Controller";
import type {Hono} from "hono";
import {InstagramController} from "~/src/api/modules/instagram/InstagramController";
import {GetSelfEndpoint} from "~/src/api/modules/creators/GetSelf/GetSelfEndpoint";
import {GetCreatorBrandsEndpoint} from "~/src/api/modules/creators/GetCreatorBrands/GetCreatorBrandsEndpoint";
import {UpdateCreatorBrandsEndpoint} from "~/src/api/modules/creators/UpdateCreatorBrands/UpdateCreatorBrandsEndpoint";
import {UpdateCreatorEndpoint} from "~/src/api/modules/creators/UpdateCreator/UpdateCreatorEndpoint";
import {GetBrandCreatorsEndpoint} from "~/src/api/modules/brands/GetBrandCreators/GetBrandCreatorsEndpoint";


export function initializeHonoRouter(app: Hono) {
    const controllers: Controller[] = [
        new InstagramController(app)
    ];

    const endpoints: Endpoint[] = [
        new GetSelfEndpoint(),
        new GetCreatorBrandsEndpoint(),
        new UpdateCreatorBrandsEndpoint(),
        new UpdateCreatorEndpoint(),
        new GetBrandCreatorsEndpoint(),
    ];

    for(const controller of controllers) {
        controller.endpoints();
    }

    for(const endpoint of endpoints) {
        endpoint.register(app);
    }
}

