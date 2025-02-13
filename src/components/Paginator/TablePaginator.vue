<script setup lang='ts'>
    import {appSettings} from "~/src/GlobalSettings";
    import type {Paginator} from "~/src/utils/Pagination/Paginator";
    const props = defineProps<{
        paginator: Paginator<any>
    }>();

    const {paginator} = toRefs(props);

</script>

<template>
    <div class="flex items-center justify-between mt-auto text-text-normal">
        <div class="flex gap-9 ">
            <p>showing {{ paginator.page.value }} of {{ paginator.pages.value }}</p>
            <div class="flex items-center">
                <select @change="paginator.changeLimit">
                    <option :selected="appSettings.defaultLimit === 1" value="1">1</option>
                    <option :selected="appSettings.defaultLimit === 5" value="5">5</option>
                    <option :selected="appSettings.defaultLimit === 10" value="10">10</option>
                </select>
                <p>per page</p>
            </div>
        </div>
        <div class="flex gap-3">
            <button v-if="paginator.hasPrevious()" @click="paginator.previousPage()"
                    class="py-2 px-3 rounded bg-background">previous
            </button>
            <button v-if="paginator.hasNext()" @click="paginator.nextPage()"
                    class="py-2 px-3 rounded bg-background">next
            </button>
        </div>
    </div>
</template>