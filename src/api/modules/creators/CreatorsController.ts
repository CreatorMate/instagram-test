import {Controller} from "@/src/api/utils/Controller"
import type {Context} from "hono";
import type {HonoUser} from "~/src/api/utils/HonoComposables";


export class CreatorsController extends Controller {
    async endpoints() {
        // this.app.get('/creators/me', async(context: Context): Promise<any> => {
        //     const honoUser = this.getHonoUser(context);
        //     if(!user) {
        //         user = await this.createUser(honoUser);
        //     }
        // });
    }
}