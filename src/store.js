import { reactive } from 'vue'
import axios from 'axios'
import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from './firebase';

export const store = reactive({

    start() {
        this.user.checkLogged()
        console.log('-START-');
    },

    onLogin() {
        console.log('-Is logeed-');

        this.firebase.db_get();
    },

    user: {
        isLogged: null,
        idToken: null,
        email: null,
        userName: null,
        checkLogged() {
            onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    this.isLogged = true
                    this.idToken = currentUser.accessToken
                    this.email = currentUser.email

                    if (this.userName) {
                        await this.addUserName(this.userName)
                    } else {
                        this.userName = await this.getUserName()
                    }
                    console.log(store.user);

                    store.onLogin();
                } else {
                    this.reset();
                }
            });
        },

        // Metodo per eseguire il login
        async login(email, password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                return true
            } catch (error) {
                this.reset();
                console.error('Login failed', error);
                return false
            }
        },
        async googleLogin() {
            try {
                await signInWithPopup(auth, provider);
                return true
            } catch (error) {
                this.reset();
                console.error('Login failed', error);
                return false
            }
        },
        // Metodo per eseguire il register
        async register(userName, email, password) {
            try {
                this.userName = userName
                await createUserWithEmailAndPassword(auth, email, password);
                return true
            } catch (error) {
                this.reset();
                console.error('Error registering:', error);
                alert('Registration failed. Please try again.');
                return false
            }
        },
        resetPassword(email) {
            if (email.trim() === '') {
                alert("Inserisci l'email per recuperare la password.");
                return;
            }
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Email per il reset della password inviata.");
                })
                .catch((error) => {
                    alert(error.message);
                    console.error("Errore di reset della password:", error);
                });
        },
        // Metodo per eseguire il logout
        async getUserName() {

            return await axios.post('/api/g/userdata/userName', {}, {
                headers: {
                    "Authorization": this.idToken
                }
            })
                .then(async (res) => {
                    if (res.data && res.data.constructor !== Object) {
                        return res.data
                    } else {
                        const userName = prompt("Inserisci il Nome utenete").trim();
                        if (userName != null && userName != '') {
                            return await this.addUserName(userName)
                        } else {
                            alert("Nome non settato correttamente");
                            return null
                        }
                    }
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })


        },
        // Metodo per eseguire il logout
        async addUserName(userName) {
            return await axios.post('/api/a/userdata', { userName }, {
                headers: {
                    "Authorization": this.idToken
                }
            })
                .then((res) => {
                    if (res.data.userName) {
                        return res.data.userName
                    } else {
                        return null
                    }
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })

        },
        // Metodo per eseguire il logout
        async logout() {
            try {
                await signOut(auth);
            } catch (error) {
                this.reset();
                console.error('Logout failed', error);
            }
        },
        // Metodo per eseguire il logout
        reset() {
            this.isLogged = false
            this.idToken = null
            this.email = null
            this.userName = null
        },

    },

    firebase: {
        items: {},
        async db_get() {
            this.items = {}
            return await axios.post('/api/g/items', {}, {
                headers: {
                    "Authorization": store.user.idToken
                }
            })
                .then((res) => {
                    if (res.data) {
                        this.items = res.data
                    }
                    return true
                })
                .catch((error) => {
                    console.error(error)
                    return false
                })
        },
        async db_add(item) {
            return await axios.post('/api/a/items', { name: item, id: true }, {
                headers: {
                    "Authorization": store.user.idToken
                }
            })
                .then((res) => {
                    if (res.data) {
                        const [[key, value]] = Object.entries(res.data);
                        this.items[key] = value
                    }
                    return true
                })
                .catch((error) => {
                    console.error(error)
                    return false
                })
        },
        // 
        async db_update(id, newItemsName) {
            // let newItemsName = prompt("Inserisci il nuovo nome", this.items[id].name).trim();

            if (newItemsName != null) {
                if (newItemsName === '') {
                    return await this.db_delete(id)
                } else {
                    return await axios.put('/api/u/items', { name: newItemsName, id }, {
                        headers: {
                            "Authorization": store.user.idToken
                        }
                    })
                        .then((res) => {
                            if (res.data) {
                                const [[key, value]] = Object.entries(res.data);
                                this.items[key] = value
                            }
                            return true
                        })
                        .catch((error) => {
                            console.error(error)
                            return false
                        })
                }
            } else {

            }
        },
        // 
        async db_delete(id) {
            return await axios.delete('/api/d/items', { data: { id }, headers: { "Authorization": store.user.idToken } })
                .then((res) => {
                    if (res.data.deleted) {
                        delete this.items[res.data.deleted]
                        return true
                    } else {
                        return false
                    }

                })
                .catch((error) => {
                    console.error(error)
                    return false
                })
        },
    },

    loading: {
        state: false,
        msg: "",
        on(msg = "Loading...") {
            this.msg = msg
            this.state = true
        },
        off() { this.state = false },
    },

    // validate: {
    //     form: '',
    //     VL: {},

    //     init(form = '') {
    //         this.VL = {}
    //         this.form = form
    //     },

    //     check(request) {
    //         const { type, query, required, form, ...varTocheck } = request;
    //         if (!form) {
    //             form = ''
    //         }
    //         console.log('form : ', form);

    //         if (Object.keys(varTocheck).length === 1) {
    //             const [varName, value] = Object.entries(varTocheck)[0];
    //             if (type) {
    //                 request.type = request.type.replace(/\s/g, '');

    //                 console.log(type, query, required, varName, value, form);

    //                 if (!Object.hasOwn(this.VL, form)) {
    //                     this.VL[form] = {}
    //                 }
    //                 console.log(this.VL);

    //                 if (!Object.hasOwn(this.VL[form], varName)) {
    //                     this.VL[form][varName] = null
    //                 }

    //                 console.log(this.VL);

    //                 switch (type) {
    //                     case 'string':
    //                         this.VL_string(form, value, varName, query)
    //                         break;

    //                     case 'email':
    //                         this.VL_email(form, value, varName)
    //                         break;

    //                     case 'integer':
    //                         this.VL_integer(form, value, varName, query)
    //                         break;

    //                     case 'decimal':
    //                         this.VL_decimal(form, value, varName, query)
    //                         break;

    //                     case 'boolean':
    //                         this.VL_boolean(form, value, varName);
    //                         break;

    //                     case 'password':
    //                         this.VL_password(form, value, varName, query);
    //                         break;

    //                     case 'retype-password':
    //                         this.VL_retypePassword(form, value, varName, query);
    //                         break;

    //                     default:
    //                         console.error('Tipo di validazione non corretta. Controllare README.md')
    //                         return '';
    //                 }

    //                 if (this.VL[form][varName] === true) {
    //                     return 'is-valid';
    //                 } else if (this.VL[form][varName] === false) {
    //                     return 'is-invalid';
    //                 } else {
    //                     return '';
    //                 }

    //             } else {
    //                 console.error("Object.type ASSENTE")
    //                 return '';
    //             }
    //         } else {
    //             console.error("Object.varTocheck ASSENTE o hai aggiunto Object.key non richesti")
    //             return '';
    //         }
    //     },

    //     isAllValidated() {
    //         let isValid = true
    //         for (const varName in this.VL[this.form]) {
    //             if (!this.VL[this.form][varName]) {
    //                 this.VL[this.form][varName] = false
    //                 isValid = this.VL[this.form][varName];
    //             }
    //         }
    //         return isValid
    //     },

    //     showError(varName) {
    //         if (this.VL[this.form][varName] === false) {
    //             return 'text-danger ps-2 mb-0 small '
    //         }
    //         return 'd-none'
    //     },

    //     VL_string(form, value, varName, query) {
    //         let min = 3;
    //         let max = 255;

    //         if (query) {
    //             query = query.map(Number);
    //             min = query[0] || min;
    //             max = query[1] || max;
    //         }

    //         if (
    //             value.length <= max &&
    //             value.length >= min
    //         ) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },

    //     VL_email(form, value, varName) {
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    //         if (emailRegex.test(value)) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },
    //     VL_integer(form, value, varName, query) {
    //         let min = 1;
    //         let max = 255;

    //         if (query) {
    //             query = query.map(Number);
    //             min = query[0] || min;
    //             max = query[1] || max;
    //         }

    //         if (
    //             value <= max &&
    //             value >= min &&
    //             value % 1 == 0
    //         ) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },
    //     VL_decimal(form, value, varName, query) {
    //         let min = 1;
    //         let max = 9999.99;

    //         if (query) {
    //             query = query.map(Number);
    //             min = query[0] || min;
    //             max = query[1] || max;
    //         }

    //         if (
    //             value <= max &&
    //             value >= min
    //         ) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },
    //     VL_boolean(form, value, varName) {
    //         if (
    //             value == "0" ||
    //             value == "1" ||
    //             value == 0 ||
    //             value == 1
    //         ) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },

    //     VL_password(form, value, varName, query) {
    //         let min = 8;
    //         let max = 255;

    //         if (query) {
    //             query = query.map(Number);
    //             min = query[0] || min;
    //             max = query[1] || max;
    //         }

    //         if (
    //             value.length <= max &&
    //             value.length >= min
    //         ) {
    //             this.VL[form][varName] = true
    //         } else {
    //             if (this.VL[form][varName] !== null) {
    //                 this.VL[form][varName] = false;
    //             }
    //         }
    //     },

    //     VL_retypePassword(form, value, varName, query) {
    //         console.log(query);
    //         if (value.length >= 8) {
    //             if (value === query & query.length >= 8) {
    //                 this.VL[form][varName] = true
    //             } else {
    //                 if (this.VL[form][varName] !== null || query.length >= 8) {
    //                     this.VL[form][varName] = false;
    //                 }
    //             }
    //         }

    //     },

    // }
})