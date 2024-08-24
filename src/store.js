import { reactive } from 'vue';
import Item from './models/Item.js';
// Item.configure();

export const store = reactive({
    userJWT: null,

    async start() {
        this.loading.on();
        // INSERISCI QUA CARICAMENTI DATI PUBLICI
        return
    },

    async onLogin() {
        // INSERISCI QUA CARICAMENTI DATI USER
        await this.item.get()
        this.loading.on("Altri 2s per vedere il loader");
        setTimeout(() => {
            this.loading.off();
        }, 2000);
    },

    onLogout() {
        console.log('- LOGOUT -');
    },

    item: {
        all: null,

        async get() {
            this.all = await Item.get();
            return
        },

        async add(newItem) {
            const added = await Item.add(newItem, true);
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
        loadingMessages: [
            "Prepariamo qualcosa di speciale per te… resta sintonizzato!",
            "I nostri robot stanno dando gli ultimi ritocchi… tutto pronto in un attimo!",
            "Stiamo mescolando un po’ di magia digitale… presto sarai dentro!",
            "I tecnici stanno preparando un'esperienza stellare… non ci vorrà molto!",
            "Stiamo facendo una danza di caricamento… è quasi ora di partire!",
            "Il nostro team di gnomi digitali è al lavoro… quasi pronti!",
            "Stiamo preparando la magia dietro le quinte… non vediamo l’ora di mostrarti!"
        ],

        on(msg = null) {
            if (msg === null) {
                this.msg = this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)]
            } else {
                this.msg = msg
            }

            this.state = true
        },
        off() { this.state = false },
    },
});