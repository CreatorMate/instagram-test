import {Controller} from "~/src/api/utils/Controller";
import type {Context} from "hono";
import {errorResponse, inheritResponse, successResponse} from "~/src/api/utils/HonoResponses";
import {CreatorAPI} from "~/src/api/utils/CreatorAPI/CreatorAPI";
import {context} from "esbuild";
import {usePrisma} from "~/src/api/src/lib/prisma";

export class InstagramController extends Controller {
    async endpoints() {
        this.app.post('/instagram/login', async (context: Context): Promise<any> => {
            try {
                const {code} = await context.req.json();

                const client_id = process.env.META_CLIENT_ID ?? '';
                const client_secret = process.env.META_CLIENT_SECRET ?? '';
                const redirect_url = process.env.META_REDIRECT_URL ?? '';

                const data = new URLSearchParams();

                data.append("client_id", client_id)
                data.append("client_secret", client_secret)
                data.append("grant_type", "authorization_code")
                data.append("redirect_uri", redirect_url)
                data.append("code", code)

                const result = await fetch('https://api.instagram.com/oauth/access_token', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: data.toString()
                });

                if(!result.ok) {
                    const json = await result.json();
                    return errorResponse(context, json, 'something went wrong')
                }

                const json = await result.json();
                const longLivedResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${json.access_token}`);

                if(!longLivedResponse.ok) {
                    return errorResponse(context, 'something went wrong while connecting ig', 'something went wrong')
                }

                const longLivedJson = await longLivedResponse.json();

                const requestProfile = await fetch(`https://graph.instagram.com/v22.0/me?fields=user_id,username&access_token=${longLivedJson.access_token}`);
                if(!requestProfile.ok) {
                    return errorResponse(context, 'something went wrong while connecting ig', 'something went wrong')
                }
                const profile = await requestProfile.json();

                const honoUser = this.getHonoUser(context);
                const prismaClient = usePrisma();
                const updated = await prismaClient.creators.updateMany({
                    where: {
                        email: honoUser.email,
                    },
                    data: {
                        ig_id: profile.user_id,
                        access_token: longLivedJson.access_token,
                    }
                });

                return successResponse(context, {
                    user_id: json.user_id,
                    access_token: longLivedJson.access_token,
                });
            } catch (error: any) {
                return errorResponse(context, error, 'something went wrong')
            }

        });

        this.app.get('/instagram/me', async (context: Context): Promise<any> => {
            const {email} = context.req.query();
            const profile = await this.getProfile(email);
            if(!profile) {
                return errorResponse(context, 'no linked creator');
            }

            const request = await fetch(`https://graph.instagram.com/v22.0/me?fields=biography,followers_count,follows_count,media_count,name,profile_picture_url,username&access_token=${profile.access_token}`);
            const result = await request.json();

            return successResponse(context, result);
        });

        this.app.get('/instagram/media', async (context: Context): Promise<any> => {
            const {email} = context.req.query();
            const profile = await this.getProfile(email);
            if(!profile) {
                return errorResponse(context, 'no linked creator');
            }

            const mediaItems = [];
            const request = await fetch(`https://graph.instagram.com/v22.0/${profile.ig_id}/media?fields=caption&access_token=${profile.access_token}`);

            if(!request.ok) {
                return errorResponse(context, 'no media');
            }

            const requestedMedia = await request.json();

            for(const media of requestedMedia.data) {
                const requestLikes = await fetch(`https://graph.instagram.com/v22.0/${media.id}/insights?metric=likes&access_token=${profile.access_token}`);
                if(!requestLikes.ok) {
                    mediaItems.push(requestLikes.statusText)
                    continue;
                }

                const requestedLikes = await requestLikes.json();

                mediaItems.push({
                    caption: media.caption,
                    likes: requestedLikes.data[0].values[0].value,
                });
            }

            return successResponse(context, mediaItems);
        });

        this.app.post('/instagram/open', async (context: Context): Promise<any> => {
            const {url, access_token, user_id} = await context.req.json();

            const request = await fetch(`https://graph.instagram.com/v22.0/${url}&access_token=${access_token}`);
            const result = await request.json();

            return successResponse(context, result);
        });
    }

    private async getProfile(email: string) {
        const profile = await usePrisma().creators.findFirst({
            where: {
                email: email
            }
        });
        if(!profile) {
            return null;
        }

        if(!profile.access_token || !profile.ig_id) {
            return null;
        }

        return profile
    }
}