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

        // Costruisci l'oggetto usando il metodo build
        FIREBASE.build.call(this, item, required, optional);
    }

    static async parse(res) {
        for (const key in res) {
            res[key] = new Item(res[key])
            await res[key].getFiles()
        }
        return res;
    }
}