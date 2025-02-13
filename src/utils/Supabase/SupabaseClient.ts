import {SupabaseClient} from "@supabase/supabase-js";

export async function getSupabaseClient(): Promise<SupabaseClient> {
    const {user, logout} = useOidcAuth();
    const result = await $fetch('/API/supabase');
    //@ts-ignore
    const accessToken = result.data
    let supabase = new SupabaseClient(
        process.env.SUPABASE_PLATFORM_URL as string,
        process.env.SUPABASE_PLATFORM_KEY as string,
         {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    );

    return supabase
}