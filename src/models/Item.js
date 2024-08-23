// Item.js
import FIREBASE from "../personal_modules/firebase";

export default class Item extends FIREBASE {
    static mainPaths = "items"; // Definisci qui il mainPaths per firebase 

    constructor(item = {}) {
        super()
        const required = {
            name: null,
        };

        const optional = {
        };

        for (const key in { ...required, ...optional, id: '', files: '' }) {
            this[key] = item[key] ?? required[key] ?? optional[key];
        }
    }

    static async parse(res) {
        for (const key in res) {
            res[key] = new Item(res[key])
            await res[key].getFiles()
        }
        return res;
    }
}