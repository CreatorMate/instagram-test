import {appSettings} from "~/src/GlobalSettings";
import type {Ref} from "vue";
import type {APIResponse} from "~/src/api/utils/HonoResponses";


export class Paginator<T> {
    public page: Ref<number>;
    public pages: Ref<number>;
    public limit: Ref<number>;
    public loading: Ref<boolean>;
    public items: Ref<T[]>;
    private endpoint: string;
    public params: string
    public total: Ref<number> = ref(0);

    constructor(endpoint: string, params: string, loading: Ref<boolean>) {
        this.page = ref(1);
        this.pages = ref(0);
        this.limit = ref(appSettings.defaultLimit);
        this.loading = loading
        this.endpoint = endpoint;
        this.items = ref([]);
        this.params = params
    }

    public async getContent() {
        this.loading.value = true;
        const request: APIResponse = await $fetch(this.endpoint + this.toParams() + this.params);
        this.items.value = [];
        this.loading.value = false;
        if(!request.success) {
            throw Error(`something went wrong while fetching from: ${this.endpoint}`)
        }
        this.setPages(request.meta);
        this.total.value = request.meta.pagination.total;
        this.items.value = [...request.data]
    }

    public setPages(meta: any) {
        this.pages.value = Math.ceil(meta.pagination.total / meta.pagination.perPage);
    }

    public async setPage(page: number) {
        this.page.value = page;
        await this.getContent();
    }

    public async changeLimit(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.limit.value = Number(target.value);
        this.page.value = 1;
        await this.getContent();
    }

    public toParams() {
        return "?page=" + this.page.value + "&limit=" + this.limit.value;
    }

    public async nextPage() {
        this.page.value = this.page.value + 1;
        await this.getContent();
    }

    public async previousPage() {
        this.page.value = this.page.value - 1;
        await this.getContent();
    }

    public hasNext(): boolean {
        return this.page.value != this.pages.value;
    }

    public hasPrevious(): boolean {
        return this.page.value > 1;
    }
}