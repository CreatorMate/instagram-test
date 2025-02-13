import {PrismaClient} from "@prisma/client";
import {usePrisma} from "~/src/api/src/lib/prisma";

export function getPrismaClient(): PrismaClient {
    return usePrisma();
}

export interface HonoUser {
    sub: string,
    email: string,
    nickname: string
}