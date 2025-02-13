import type {APIResponse} from "~/src/api/utils/HonoResponses";

export class CreatorAPI {
    public static async ask<T>(path: string, method: 'GET'|'POST'|'PUT'|'DELETE' = 'GET', data: object = {}): Promise<APIResponse<T>>  {
        try {
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
            const request = await fetch(`${process.env.CREATOR_API_PATH}${path}`, requestObject);

            return await request.json() as APIResponse;
        } catch (error) {
            return {
                success: false,
                error: "NOT_AVAILABLE",
                message: "creator server under maintenance"
            } as APIResponse
        }
    }
}