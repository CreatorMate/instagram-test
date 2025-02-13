import type {APIResponse} from "~/src/api/utils/HonoResponses";
import {useToastState} from "~/src/utils/Toast/ToastState";

export class API {
    public static async ask<T>(path: string, method: 'GET'|'POST'|'PUT'|'DELETE' = 'GET', data: object = {}): Promise<APIResponse<T>>  {
        const requestObject: RequestInit = {}
        requestObject.method = method;
        if(method !== 'GET') {
            requestObject.body = JSON.stringify(data);
        }
        requestObject.headers = {
            'Authorization': `Bearer ${process.env.CREATOR_API_KEY}`,
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        }
        const config = useRuntimeConfig();

        const request = await fetch(`${config.public.BASE_URL}${'/API'}${path}`, requestObject);

        const response: APIResponse<T> = await request.json() as APIResponse;

        if(response.message) {
            const toastState = useToastState();
            toastState.addToast(response.message, response.success);
        }

        return response;
    }
}