import FIREBASE from "../personal_modules/firebase";

export default class Item extends FIREBASE {
    constructor(item = {}) {
        super('items');
        const required = {
            name: null,
        };

        const optional = {
            data: null,
            id: ''
        };

        for (const key in { ...required, ...optional }) {
            this[key] = item[key] ?? required[key] ?? optional[key];
        }
    }
    static configure() {
        super.configure('items'); // Configura le proprietà statiche
    }

    static async parse(res) {
        for (const key in res) {
            res[key].id = key
            res[key] = new Item(res[key])
        }

        console.log(res);
        return res;
    }
}