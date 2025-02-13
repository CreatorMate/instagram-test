export type User = {
    id: string,
    email: string,
    access_token: string,
    name: string,
    brands: Brand,
    expires_at: string,
    ig_id: string
}

export type Creator = {
    id: string,
    sub: string,
    status: AccountStatus,
    handle: string,
    email: string,
    based_in: string,
    project_types: string,
    created_at: string,
    date_of_birth: string,
    additional_info: string,
    tik_tok: string
    linked: boolean
}

export enum AccountStatus {
    NEW = "NEW",
    INVITED = "INVITED",
    IN_REVIEW = "IN_REVIEW",
    ACCEPTED = "ACCEPTED"
}


export type Brand = {
    id: number,
    name: string,
}