import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    textHello: 'Ciao Mondo',

    start() {
        axios.get('/api')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                location.reload();
            });
        axios.post('/api/test', { msg: 'Hello World' })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                location.reload();
            });
    },

    loading: {
        state: false,
        msg: "",
        on(msg = "Loading...") {
            this.msg = msg
            this.state = true
        },
        off() { this.state = false },
    }
})