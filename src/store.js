import { reactive } from 'vue';
import Item from './models/Item.js';

// Configura la classe Item prima di chiamare i metodi statici
Item.configure();

export const store = reactive({
    userJWT: null,
    items: null,

    async onLogin() {
        console.log('- LOGIN -');
        this.loading.on("Altri 2s per vedere il loader");

        this.items = await Item.get(); // Chiamata al metodo statico `get`

        setTimeout(() => {
            this.loading.off();
        }, 2000);
    },

    onLogout() {
        console.log('- LOGOUT -');
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