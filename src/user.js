import { reactive } from 'vue'
import axios from 'axios'
import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from './firebase';

export const user = reactive({
    accessToken: null,
    uid: null,
    email: null,
    userName: null,

    checkLogged() {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                this.accessToken = currentUser.accessToken
                this.uid = currentUser.uid
                this.email = currentUser.email

                if (this.userName) {
                    await this.addUserName(this.userName)
                } else {
                    this.userName = await this.getUserName()
                }
                // store.loading.off();
            } else {
                this.reset();
            }
        });
    },

    // Metodo per eseguire il login
    async login(email, password) {
        try {
            // store.loading.on();
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
            // store.loading.on();
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
            // store.loading.on();
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
                // store.loading.off();
                console.error("Errore di reset della password:", error);
            });
    },
    // Metodo per eseguire il logout
    async getUserName() {
        // store.loading.on();
        return await axios.post('/api/g/userdata/userName', {}, {
            headers: {
                "Authorization": this.accessToken
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
                // store.loading.off();
                return null
            })


    },
    // Metodo per eseguire il logout
    async addUserName(userName) {
        // store.loading.on();
        return await axios.post('/api/a/userdata', { userName }, {
            headers: {
                "Authorization": this.accessToken
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
                // store.loading.off();
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
        this.accessToken = false
        this.uid = null
        this.email = null
        this.userName = null
        // store.loading.off();
    },


})