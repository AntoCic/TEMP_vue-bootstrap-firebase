import { reactive } from 'vue';
import Item from './models/Item.js';
// Item.configure();

export const store = reactive({
    userJWT: null,
    items: null,

    async onLogin() {
        this.loading.on("Altri 2s per vedere il loader");

        this.item.get()

        setTimeout(() => {
            this.loading.off();
        }, 2000);
    },

    onLogout() {
        console.log('- LOGOUT -');
    },

    item: {
        all: {},

        async get() {
            this.all = await Item.get();
        },

        async add(newItem) {
            const added = await Item.add(newItem);
            if (added) {
                this.all = { ...this.all, ...added }
            } else {
                console.error('Errore adding item');
            }
        },

    },

    loading: {
        state: false,
        msg: "",
        on(msg = "Loading...") {
            this.msg = msg;
            this.state = true;
        },
        off() {
            this.state = false;
        },
    },
});