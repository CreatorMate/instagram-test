//@ts-ignore
import {defineStore} from "pinia";
import {type Ref, ref} from "vue";
import {useAccountState} from "~/src/utils/Auth/AccountState";


class PhylloConnection {
}

export const usePhylloConnection = defineStore("phyllo", () => {
    const connection: Ref<PhylloConnection> = ref({
        id: '',
        user_id: '',
        token: '',
        expires_on: new Date()
    });

    async function get() {
        const accountStore = useAccountState();
        connection.value = await $fetch( `/API/phyllo/${accountStore.user}`);
    }

    return {connection, get}
})